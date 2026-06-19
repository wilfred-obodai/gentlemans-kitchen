import { useEffect, useMemo, useState } from "react";
import { X, Plus, Minus, Send, Bike, ShoppingBag, Clock, Phone } from "lucide-react";

/* ============================================================
   Gentleman's Kitchen — Pre-Order  (right-side drawer)
   No floating button. Opens when an "open-preorder" event fires.

   HOW TO OPEN IT — add a button next to your "Order Now" button:
     <button onClick={() => window.dispatchEvent(new Event('open-preorder'))}>
       Pre-Order
     </button>

   App.tsx stays the same: <PreOrder /> (it just mounts the drawer + listener)

   EDIT: WHATSAPP_NUMBER, MENU, DEPOSIT_PERCENT below.
   ============================================================ */

const WHATSAPP_NUMBER = "233592730579";
const DEPOSIT_PERCENT = 50;
const LEAD_MINUTES = 60;
const OPEN_HOUR = 11;
const CLOSE_HOUR = 23;

type MenuItem = { name: string; price: number };

const MENU: MenuItem[] = [
  { name: "Shawarma & Potato Chips", price: 85 },
  { name: "Shawarma Only", price: 60 },
  { name: "Banku with Tilapia", price: 90 },
  { name: "Banku with Fried Fish", price: 80 },
  { name: "Jollof — Beef, Chicken & Gizzard", price: 100 },
  { name: "Fried Rice — Beef, Chicken & Gizzard", price: 100 },
  { name: "Jollof — Beef, Shrimp & Octopus", price: 150 },
  { name: "Fried Rice — Beef, Shrimp & Octopus", price: 150 },
  { name: "Noodles — Beef, Chicken & Gizzard", price: 100 },
  { name: "Indomie — Beef, Chicken & Gizzard", price: 100 },
  { name: "Noodles — Beef, Shrimp & Octopus", price: 150 },
  { name: "Indomie — Beef, Shrimp & Octopus", price: 150 },
  { name: "Fried Plantain with Chicken Stew", price: 55 },
  { name: "Fried Plantain with Chicken Wings Stew", price: 70 },
  { name: "Boiled Plantain with Chicken Stew", price: 55 },
  { name: "Boiled Plantain with Chicken Wings", price: 70 },
];

type OrderType = "delivery" | "pickup";

const cedis = (n: number) => `₵${n.toLocaleString("en-GH")}`;

function todayISO(): string {
  const d = new Date();
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

function prettyDate(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

function allSlots(): string[] {
  const slots: string[] = [];
  for (let h = OPEN_HOUR; h <= CLOSE_HOUR; h++) {
    for (const min of [0, 30]) {
      if (h === CLOSE_HOUR && min === 30) continue;
      slots.push(`${`${h}`.padStart(2, "0")}:${`${min}`.padStart(2, "0")}`);
    }
  }
  return slots;
}

// Pre-order reference, e.g. PRE-260619-482 (PRE- prefix keeps it distinct from normal orders)
function makeRef(): string {
  const d = new Date();
  const ymd = `${`${d.getFullYear()}`.slice(2)}${`${d.getMonth() + 1}`.padStart(2, "0")}${`${d.getDate()}`.padStart(2, "0")}`;
  const rand = Math.floor(100 + Math.random() * 900);
  return `PRE-${ymd}-${rand}`;
}

export default function PreOrder() {
  const [open, setOpen] = useState(false);

  const [orderType, setOrderType] = useState<OrderType>("delivery");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState(todayISO());
  const [time, setTime] = useState("");
  const [qty, setQty] = useState<Record<string, number>>({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const [sentRef, setSentRef] = useState("");

  // Open the drawer when any "Pre-Order" button fires the event
  useEffect(() => {
    const openIt = () => setOpen(true);
    window.addEventListener("open-preorder", openIt);
    return () => window.removeEventListener("open-preorder", openIt);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const isToday = date === todayISO();

  const availableSlots = useMemo(() => {
    const list = allSlots();
    if (!isToday) return list;
    const now = new Date();
    const cutoff = now.getHours() * 60 + now.getMinutes() + LEAD_MINUTES;
    return list.filter((s) => {
      const [hh, mm] = s.split(":").map(Number);
      return hh * 60 + mm >= cutoff;
    });
  }, [isToday, date]);

  const selected = useMemo(
    () => MENU.map((m) => ({ ...m, qty: qty[m.name] || 0 })).filter((m) => m.qty > 0),
    [qty]
  );
  const itemCount = useMemo(() => selected.reduce((s, i) => s + i.qty, 0), [selected]);
  const subtotal = useMemo(() => selected.reduce((s, i) => s + i.qty * i.price, 0), [selected]);
  const deposit = Math.round((subtotal * DEPOSIT_PERCENT) / 100);

  const bump = (itemName: string, delta: number) =>
    setQty((q) => ({ ...q, [itemName]: Math.max(0, (q[itemName] || 0) + delta) }));

  const errors: string[] = [];
  if (selected.length === 0) errors.push("Add at least one item.");
  if (!date) errors.push("Pick a date.");
  if (!time) errors.push("Pick a time.");
  if (orderType === "delivery" && address.trim().length < 6) errors.push("Add a delivery address.");
  if (name.trim().length < 2) errors.push("Add your name.");
  if (phone.trim().length < 8) errors.push("Add a phone number.");
  const valid = errors.length === 0;

  const send = () => {
    if (!valid) {
      setShowErrors(true);
      return;
    }
    const ref = makeRef();
    const lines = [
      "*PRE-ORDER — Gentleman's Kitchen*",
      `Pre-Order No: ${ref}`,
      "",
      `Name: ${name.trim()}`,
      `Phone: ${phone.trim()}`,
      "",
      `Type: ${orderType === "delivery" ? "Delivery" : "Pickup"}`,
      orderType === "delivery" ? `Address: ${address.trim()}` : null,
      `Date: ${prettyDate(date)}`,
      `Time: ${time}`,
      "",
      "Items:",
      ...selected.map((i) => `• ${i.qty}x ${i.name} — ${cedis(i.qty * i.price)}`),
      "",
      `Total: ${cedis(subtotal)}`,
      `Deposit (${DEPOSIT_PERCENT}%): ${cedis(deposit)}`,
      notes.trim() ? `Notes: ${notes.trim()}` : null,
      "",
      "I'd like to confirm this pre-order and arrange the deposit. Thank you!",
    ].filter(Boolean) as string[];

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (!win) window.location.href = url; // fallback if popups are blocked
    setSentRef(ref);
  };

  if (!open) {
    // Nothing visible until a Pre-Order button fires the event
    return <style>{CSS}</style>;
  }

  return (
    <>
      <style>{CSS}</style>
      <div className="gkpo-overlay" onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
        <aside className="gkpo-drawer" role="dialog" aria-modal="true" aria-label="Pre-order">
          <header className="gkpo-dhead">
            <div>
              <h2 className="gkpo-title">Pre-Order</h2>
              <p className="gkpo-sub">
                {itemCount > 0 ? `${itemCount} item${itemCount > 1 ? "s" : ""} · ${cedis(subtotal)}` : "Order ahead for later"}
              </p>
            </div>
            <button className="gkpo-x" onClick={() => setOpen(false)} aria-label="Close">
              <X size={20} />
            </button>
          </header>

          <div className="gkpo-body">
            <div className="gkpo-block">
              <span className="gkpo-label">
                <Clock size={13} /> When
              </span>
              <div className="gkpo-row2">
                <input
                  className="gkpo-input"
                  type="date"
                  min={todayISO()}
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    setTime("");
                  }}
                />
                <select className="gkpo-input" value={time} onChange={(e) => setTime(e.target.value)}>
                  <option value="">Choose time</option>
                  {availableSlots.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              {isToday && availableSlots.length === 0 && (
                <span className="gkpo-hint">No more slots today — pick another date.</span>
              )}
            </div>

            <div className="gkpo-block">
              <span className="gkpo-label">Order type</span>
              <div className="gkpo-seg">
                <button className={orderType === "delivery" ? "on" : ""} onClick={() => setOrderType("delivery")}>
                  <Bike size={16} /> Delivery
                </button>
                <button className={orderType === "pickup" ? "on" : ""} onClick={() => setOrderType("pickup")}>
                  <ShoppingBag size={16} /> Pickup
                </button>
              </div>
              {orderType === "delivery" && (
                <>
                  <textarea
                    className="gkpo-input"
                    rows={2}
                    placeholder="Delivery address (area, landmark)"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <span className="gkpo-hint">Delivery fee is confirmed on WhatsApp.</span>
                </>
              )}
            </div>

            <div className="gkpo-block">
              <span className="gkpo-label">Choose items</span>
              {MENU.map((m) => {
                const c = qty[m.name] || 0;
                return (
                  <div className={`gkpo-item ${c > 0 ? "active" : ""}`} key={m.name}>
                    <div>
                      <div className="gkpo-item-name">{m.name}</div>
                      <div className="gkpo-item-price">{cedis(m.price)} each</div>
                    </div>
                    <div className="gkpo-step">
                      <button onClick={() => bump(m.name, -1)} disabled={c === 0} aria-label={`Remove one ${m.name}`}>
                        <Minus size={15} />
                      </button>
                      <span>{c}</span>
                      <button onClick={() => bump(m.name, 1)} aria-label={`Add one ${m.name}`}>
                        <Plus size={15} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="gkpo-block">
              <span className="gkpo-label">Your details</span>
              <input className="gkpo-input" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
              <input className="gkpo-input" type="tel" placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>

            <div className="gkpo-block">
              <span className="gkpo-label">Add a note (optional)</span>
              <textarea
                className="gkpo-input"
                rows={2}
                placeholder="e.g. extra spice, no onions…"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>

          <footer className="gkpo-foot">
            {subtotal > 0 && (
              <>
                <div className="gkpo-total">
                  <span>Total</span>
                  <span className="gkpo-total-amt">{cedis(subtotal)}</span>
                </div>
                <div className="gkpo-dep">
                  <span>Deposit ({DEPOSIT_PERCENT}%)</span>
                  <span>{cedis(deposit)}</span>
                </div>
              </>
            )}
            {sentRef && (
              <div className="gkpo-okref">
                ✓ Pre-order sent. Your reference: <strong>{sentRef}</strong> — please keep it.
              </div>
            )}
            {showErrors && !valid && (
              <div className="gkpo-err">
                {errors.map((e, i) => (
                  <div key={i}>{e}</div>
                ))}
              </div>
            )}
            <button className="gkpo-wa" onClick={send}>
              <Send size={18} /> Send pre-order via WhatsApp
            </button>
            <a className="gkpo-call" href={`tel:+${WHATSAPP_NUMBER}`}>
              <Phone size={17} /> Call to order
            </a>
            <p className="gkpo-fine">A {DEPOSIT_PERCENT}% deposit confirms your pre-order — arranged on WhatsApp ✓</p>
          </footer>
        </aside>
      </div>
    </>
  );
}

const CSS = `
.gkpo-overlay{
  position:fixed; inset:0; z-index:9999; background:rgba(4,3,2,.66);
  backdrop-filter:blur(2px); display:flex; justify-content:flex-end;
  animation:gkpoFade .2s ease;
}
.gkpo-drawer{
  width:440px; max-width:92vw; height:100%; background:#14100B;
  border-left:1px solid #2C2318; display:flex; flex-direction:column;
  color:#F5EFE6; box-shadow:-24px 0 60px rgba(0,0,0,.5);
  animation:gkpoSlide .28s cubic-bezier(.2,.7,.2,1);
}

.gkpo-dhead{
  display:flex; align-items:flex-start; justify-content:space-between;
  padding:24px 24px 18px; border-bottom:1px solid #241C13;
}
.gkpo-title{
  margin:0; font-family:'Playfair Display',Georgia,serif;
  font-size:26px; font-weight:700; color:#EC8A2A; line-height:1;
}
.gkpo-sub{ margin:7px 0 0; font-size:13px; color:#9C8E7B; }
.gkpo-x{ background:none; border:none; color:#9C8E7B; cursor:pointer; padding:4px; display:flex; border-radius:8px; }
.gkpo-x:hover{ color:#F5EFE6; }

.gkpo-body{ flex:1; overflow-y:auto; padding:20px 24px; }
.gkpo-block{ margin-bottom:22px; display:flex; flex-direction:column; gap:10px; }
.gkpo-label{
  display:flex; align-items:center; gap:6px;
  font:700 11px/1 inherit; letter-spacing:.14em; text-transform:uppercase; color:#8C7E6B;
}

.gkpo-seg{ display:flex; gap:0; background:#1A140D; border-radius:12px; padding:5px; }
.gkpo-seg button{
  flex:1; display:flex; align-items:center; justify-content:center; gap:7px;
  padding:11px; border-radius:9px; border:none; background:transparent;
  color:#9C8E7B; font:600 14px/1 inherit; cursor:pointer; transition:all .15s ease;
}
.gkpo-seg button.on{
  background:linear-gradient(90deg,#F47A1E,#E8851E); color:#fff;
  box-shadow:0 4px 14px rgba(238,123,30,.35);
}

.gkpo-input{
  width:100%; box-sizing:border-box; background:#1A140D;
  border:1px solid #2E2419; border-radius:11px; padding:12px 14px;
  color:#F5EFE6; font:400 15px/1.4 inherit; outline:none; transition:border-color .15s ease;
}
.gkpo-input::placeholder{ color:#6F6555; }
.gkpo-input:focus{ border-color:#EE7B1E; }
textarea.gkpo-input{ resize:vertical; }
.gkpo-row2{ display:flex; gap:10px; }
.gkpo-row2 .gkpo-input{ flex:1; }
.gkpo-hint{ font-size:12px; color:#8C7E6B; }

.gkpo-item{
  display:flex; align-items:center; justify-content:space-between;
  padding:13px 0; border-bottom:1px solid #221A11;
}
.gkpo-item-name{ font-size:15px; font-weight:600; }
.gkpo-item-price{ font-size:13px; color:#EC8A2A; margin-top:3px; }
.gkpo-step{ display:flex; align-items:center; gap:12px; }
.gkpo-step button{
  width:34px; height:34px; display:flex; align-items:center; justify-content:center;
  border-radius:9px; border:1px solid #3A2E1F; background:#1A140D; color:#EE7B1E; cursor:pointer;
}
.gkpo-step button:hover:not(:disabled){ border-color:#EE7B1E; }
.gkpo-step button:disabled{ opacity:.3; cursor:not-allowed; }
.gkpo-step span{ min-width:16px; text-align:center; font-weight:700; }

.gkpo-foot{ border-top:1px solid #241C13; padding:18px 24px 22px; background:#120E09; }
.gkpo-total{ display:flex; justify-content:space-between; align-items:baseline; }
.gkpo-total span:first-child{ font-size:16px; font-weight:600; }
.gkpo-total-amt{ font-family:'Playfair Display',Georgia,serif; font-size:26px; font-weight:700; color:#EC8A2A; }
.gkpo-dep{ display:flex; justify-content:space-between; font-size:13px; color:#9C8E7B; margin-top:4px; }

.gkpo-okref{
  margin:0 0 12px; padding:11px 14px; border-radius:10px;
  background:rgba(34,197,94,.14); border:1px solid rgba(34,197,94,.4);
  color:#A7E8C0; font-size:13px; line-height:1.5;
}
.gkpo-okref strong{ color:#fff; }

.gkpo-err{
  margin:12px 0 0; padding:10px 14px; border-radius:10px;
  background:rgba(220,80,40,.14); border:1px solid rgba(220,80,40,.4); color:#F3B89C; font-size:13px;
}

.gkpo-wa{
  width:100%; margin-top:14px; display:flex; align-items:center; justify-content:center; gap:9px;
  padding:15px; border:none; border-radius:13px;
  background:linear-gradient(90deg,#16A34A,#22C55E); color:#fff;
  font:700 15px/1 inherit; cursor:pointer; transition:filter .15s ease, transform .15s ease;
}
.gkpo-wa:hover:not(:disabled){ filter:brightness(1.06); transform:translateY(-1px); }
.gkpo-wa:disabled{ opacity:.45; cursor:not-allowed; }
.gkpo-call{
  width:100%; box-sizing:border-box; margin-top:10px;
  display:flex; align-items:center; justify-content:center; gap:9px;
  padding:14px; border-radius:13px; text-decoration:none;
  background:linear-gradient(90deg,#2563EB,#3B82F6); color:#fff;
  font:700 15px/1 inherit; cursor:pointer; transition:filter .15s ease, transform .15s ease;
}
.gkpo-call:hover{ filter:brightness(1.06); transform:translateY(-1px); }
.gkpo-fine{ margin:11px 0 0; text-align:center; font-size:11px; color:#6F6555; }

:focus-visible{ outline:2px solid #EE7B1E; outline-offset:2px; }

@keyframes gkpoFade{ from{opacity:0} to{opacity:1} }
@keyframes gkpoSlide{ from{transform:translateX(100%)} to{transform:translateX(0)} }

@media (max-width:560px){ .gkpo-drawer{ width:100%; max-width:100%; } }
@media (prefers-reduced-motion:reduce){ .gkpo-overlay,.gkpo-drawer,.gkpo-wa{ animation:none; transition:none; } }
`;