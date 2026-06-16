import { useState } from 'react';
import { X, Lock, ToggleLeft, ToggleRight, Zap, AlertTriangle, UtensilsCrossed, ArrowLeft, CheckCircle, Shield, Eye, EyeOff } from 'lucide-react';
import { DishSettings, Notice } from '../types';
import { getDishSetting } from '../data/storage';
import { MENU_CATEGORIES } from '../data/dishes';

interface AdminProps {
  dishes: never[];
  settings: DishSettings;
  notice: Notice;
  adminOpen: boolean;
  setAdminOpen: (v: boolean) => void;
  toggleSetting: (id: string, key: 'available' | 'quickDelivery') => void;
  saveNoticeSettings: (n: Notice) => void;
  isPage?: boolean;
}

const ADMIN_PIN = '@gk-162026';

export function AdminPanel({
  settings, notice, adminOpen, setAdminOpen,
  toggleSetting, saveNoticeSettings, isPage = false,
}: AdminProps) {
  const [authed, setAuthed] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [noticeEdit, setNoticeEdit] = useState<Notice>(notice);
  const [saved, setSaved] = useState(false);
  const [shake, setShake] = useState(false);
  const [showPin, setShowPin] = useState(false);

  if (!isPage && !adminOpen) return null;

  const handleLogin = () => {
    if (pinInput === ADMIN_PIN) {
      setAuthed(true);
      setPinError(false);
    } else {
      setPinError(true);
      setShake(true);
      setPinInput('');
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleSaveNotice = (n: Notice) => {
    saveNoticeSettings(n);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  // Use category id as the toggle key
  const getCatSetting = (id: string) => {
    const s = (settings as any)[id];
    return s ?? { available: true, quickDelivery: false };
  };

  const toggleCat = (id: string, key: 'available' | 'quickDelivery') => {
    toggleSetting(id, key);
  };

  const wrapStyle: React.CSSProperties = isPage
    ? {
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        overflow: 'hidden',
      }
    : {
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        overflow: 'hidden',
      };

  return (
    <div style={wrapStyle}>

      {/* ── Blurred logo background (page mode) ── */}
      {isPage && (
        <>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at 30% 40%, rgba(249,115,22,0.18) 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(249,115,22,0.10) 0%, transparent 50%), #0a0603',
          }} />
          <img
            src="/images/logo.png"
            alt=""
            style={{
              position: 'absolute',
              width: '60%', maxWidth: 520,
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: 0.04,
              filter: 'blur(2px) grayscale(1)',
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          />
          <div style={{ position: 'absolute', inset: 0, backdropFilter: 'blur(1px)' }} />
        </>
      )}

      {/* ── Dark overlay (modal mode) ── */}
      {!isPage && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(8px)' }} />
      )}

      {/* ── Panel ── */}
      <div style={{
        position: 'relative', zIndex: 1,
        background: 'linear-gradient(160deg, #1e1208 0%, #120c05 60%, #0e0902 100%)',
        border: '1px solid rgba(249,115,22,0.2)',
        borderRadius: 28,
        width: '100%', maxWidth: 720,
        maxHeight: isPage ? 'none' : '92vh',
        overflowY: 'auto',
        boxShadow: '0 40px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(249,115,22,0.08), inset 0 1px 0 rgba(255,255,255,0.04)',
      }}>

        {/* Header */}
        <div style={{ padding: '26px 32px', borderBottom: '1px solid rgba(249,115,22,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(249,115,22,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14,
              background: 'linear-gradient(135deg, rgba(249,115,22,0.2), rgba(249,115,22,0.06))',
              border: '1px solid rgba(249,115,22,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(249,115,22,0.2)',
            }}>
              <Shield size={22} color="#F97316" />
            </div>
            <div>
              <div className="fd" style={{ fontSize: 22, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>Admin Panel</div>
              <div className="fb" style={{ fontSize: 12, color: 'rgba(249,115,22,0.6)', marginTop: 1, letterSpacing: '0.06em' }}>GENTLEMAN'S KITCHEN</div>
            </div>
          </div>
          {isPage ? (
            <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: 13, fontFamily: 'Outfit, sans-serif', padding: '8px 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)', transition: 'all 0.2s' }}>
              <ArrowLeft size={14} /> Back to site
            </a>
          ) : (
            <button onClick={() => setAdminOpen(false)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: 'rgba(255,255,255,0.5)', cursor: 'pointer', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <X size={18} />
            </button>
          )}
        </div>

        {/* PIN screen */}
        {!authed ? (
          <div style={{ padding: '64px 32px', textAlign: 'center' }}>
            {/* Logo */}
            <img src="/images/logo.png" alt="GK" style={{ width: 100, height: 'auto', marginBottom: 28, filter: 'drop-shadow(0 4px 20px rgba(249,115,22,0.3))' }} />

            <h3 className="fd" style={{ fontSize: 30, color: '#fff', marginBottom: 8, letterSpacing: '-0.02em' }}>Staff Access Only</h3>
            <p className="fb" style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)', marginBottom: 40, lineHeight: 1.6 }}>
              Enter your admin password to manage<br />the Gentleman's Kitchen dashboard
            </p>

            {/* PIN input with eye toggle */}
            <div style={{ position: 'relative', maxWidth: 300, margin: '0 auto 20px' }}>
              <input
                type={showPin ? 'text' : 'password'}
                value={pinInput}
                onChange={e => { setPinInput(e.target.value); setPinError(false); }}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                placeholder="Enter password"
                className="fb"
                style={{
                  width: '100%',
                  padding: '16px 52px 16px 20px',
                  borderRadius: 14,
                  background: 'rgba(255,255,255,0.04)',
                  border: `1.5px solid ${pinError ? '#ef4444' : 'rgba(249,115,22,0.2)'}`,
                  color: '#fff',
                  fontSize: 16,
                  textAlign: 'center',
                  letterSpacing: showPin ? '0.05em' : '0.15em',
                  outline: 'none',
                  transition: 'border 0.3s, transform 0.1s',
                  transform: shake ? 'translateX(-6px)' : 'translateX(0)',
                  boxShadow: pinError ? '0 0 0 3px rgba(239,68,68,0.15)' : 'none',
                  boxSizing: 'border-box',
                }}
                autoFocus
              />
              {/* Eye toggle button */}
              <button
                type="button"
                onClick={() => setShowPin(p => !p)}
                style={{
                  position: 'absolute', right: 14, top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'rgba(255,255,255,0.35)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: 4, borderRadius: 6,
                  transition: 'color 0.2s',
                }}
                onMouseOver={e => (e.currentTarget.style.color = '#F97316')}
                onMouseOut={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
                tabIndex={-1}
              >
                {showPin ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {pinError && (
              <p className="fb" style={{ color: '#ef4444', fontSize: 13, marginBottom: 20 }}>
                ❌ Incorrect password. Try again.
              </p>
            )}

            <button
              className="btn-gold fb"
              onClick={handleLogin}
              style={{ padding: '15px 52px', borderRadius: 50, fontSize: 15, fontWeight: 700, letterSpacing: '0.04em', marginTop: 4 }}
            >
              Unlock Dashboard
            </button>

            <div style={{ marginTop: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <Lock size={11} color="rgba(255,255,255,0.15)" />
              <p className="fb" style={{ fontSize: 11, color: 'rgba(255,255,255,0.15)' }}>
                Restricted access · Gentleman's Kitchen staff only
              </p>
            </div>
          </div>

        ) : (
          <>
            {/* Holiday notice */}
            <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(249,115,22,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <AlertTriangle size={16} color="#F97316" />
                </div>
                <span className="fb" style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Holiday / Break Notice</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, padding: '16px 20px', borderRadius: 14, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div>
                  <div className="fb" style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>Show Banner on Website</div>
                  <div className="fb" style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>Displays a notice at the top of the site for customers</div>
                </div>
                <button style={{ cursor: 'pointer', border: 'none', background: 'none', padding: 0 }} onClick={() => setNoticeEdit(prev => ({ ...prev, active: !prev.active }))}>
                  {noticeEdit.active ? <ToggleRight size={36} color="#22c55e" /> : <ToggleLeft size={36} color="rgba(255,255,255,0.15)" />}
                </button>
              </div>

              <input className="admin-input fb" placeholder="Message e.g. Kitchen closed today — back tomorrow!" value={noticeEdit.message} onChange={e => setNoticeEdit(prev => ({ ...prev, message: e.target.value }))} style={{ marginBottom: 10 }} />
              <input className="admin-input fb" placeholder="Resuming date e.g. Monday 2nd June 2025" value={noticeEdit.resumeDate} onChange={e => setNoticeEdit(prev => ({ ...prev, resumeDate: e.target.value }))} />

              <button
                className="btn-gold fb"
                onClick={() => handleSaveNotice(noticeEdit)}
                style={{ padding: '11px 28px', borderRadius: 10, fontSize: 14, marginTop: 14, display: 'flex', alignItems: 'center', gap: 8 }}
              >
                {saved ? <><CheckCircle size={16} /> Saved!</> : 'Save Notice'}
              </button>
            </div>

            {/* Category management */}
            <div style={{ padding: '24px 32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(249,115,22,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <UtensilsCrossed size={16} color="#F97316" />
                </div>
                <span className="fb" style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Menu Category Availability</span>
              </div>
              <p className="fb" style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginBottom: 20 }}>
                Toggle categories on/off and mark quick delivery items.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {MENU_CATEGORIES.map(cat => {
                  const s = getCatSetting(cat.id);
                  return (
                    <div key={cat.id} style={{
                      display: 'flex', alignItems: 'center', gap: 14,
                      padding: '14px 18px', borderRadius: 14,
                      background: s.available ? 'rgba(255,255,255,0.02)' : 'rgba(239,68,68,0.04)',
                      border: `1px solid ${s.available ? 'rgba(255,255,255,0.06)' : 'rgba(239,68,68,0.15)'}`,
                      transition: 'all 0.3s',
                    }}>
                      {/* Category color dot */}
                      <div style={{ width: 42, height: 42, borderRadius: 10, background: `${cat.color}22`, border: `1px solid ${cat.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                        {cat.emoji}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="fb" style={{ fontSize: 14, fontWeight: 600, color: s.available ? '#fff' : 'rgba(255,255,255,0.4)' }}>{cat.name}</div>
                        <div className="fb" style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{cat.items.length} items</div>
                      </div>

                      {/* Available toggle */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                        <button style={{ cursor: 'pointer', border: 'none', background: 'none', padding: 0 }} onClick={() => toggleCat(cat.id, 'available')}>
                          {s.available ? <ToggleRight size={28} color="#22c55e" /> : <ToggleLeft size={28} color="rgba(255,255,255,0.15)" />}
                        </button>
                        <span className="fb" style={{ fontSize: 9, color: s.available ? '#22c55e' : '#ef4444', letterSpacing: '0.05em', fontWeight: 700 }}>
                          {s.available ? 'ON' : 'OFF'}
                        </span>
                      </div>

                      {/* Quick delivery toggle */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                        <button style={{ cursor: 'pointer', border: 'none', background: 'none', padding: 0 }} onClick={() => toggleCat(cat.id, 'quickDelivery')}>
                          {s.quickDelivery
                            ? <Zap size={22} color="#F97316" fill="#F97316" />
                            : <Zap size={22} color="rgba(255,255,255,0.15)" />}
                        </button>
                        <span className="fb" style={{ fontSize: 9, color: s.quickDelivery ? '#F97316' : 'rgba(255,255,255,0.2)', letterSpacing: '0.05em', fontWeight: 700 }}>FAST</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="fb" style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', textAlign: 'center', marginTop: 24 }}>
                Changes are saved automatically and reflected on the website immediately.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}