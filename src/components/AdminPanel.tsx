import { useState } from 'react';
import { X, Lock, ToggleLeft, ToggleRight, Zap, AlertTriangle, UtensilsCrossed, ArrowLeft } from 'lucide-react';
import { Dish, DishSettings, Notice } from '../types';
import { getDishSetting } from '../data/storage';

interface AdminProps {
  dishes: Dish[];
  settings: DishSettings;
  notice: Notice;
  adminOpen: boolean;
  setAdminOpen: (v: boolean) => void;
  toggleSetting: (id: number, key: 'available' | 'quickDelivery') => void;
  saveNoticeSettings: (n: Notice) => void;
  isPage?: boolean;
}

const ADMIN_PIN = '1234';

export function AdminPanel({
  dishes, settings, notice, adminOpen, setAdminOpen,
  toggleSetting, saveNoticeSettings, isPage = false,
}: AdminProps) {
  const [authed, setAuthed] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [noticeEdit, setNoticeEdit] = useState<Notice>(notice);
  const [saved, setSaved] = useState(false);

  if (!isPage && !adminOpen) return null;

  const handleLogin = () => {
    if (pinInput === ADMIN_PIN) { setAuthed(true); setPinError(false); }
    else { setPinError(true); setPinInput(''); }
  };

  const handleSaveNotice = (n: Notice) => {
    saveNoticeSettings(n);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const containerStyle = isPage
    ? { minHeight: '100vh', background: '#0f0b07', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }
    : { position: 'fixed' as const, inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 300, backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 };

  return (
    <div style={containerStyle}>
      <div style={{ background: 'linear-gradient(145deg, #1c1509, #110d06)', border: '1px solid rgba(249,115,22,0.25)', borderRadius: 24, width: '100%', maxWidth: 700, maxHeight: isPage ? 'none' : '92vh', overflowY: 'auto', boxShadow: '0 30px 80px rgba(0,0,0,0.7)' }}>

        {/* Header */}
        <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(249,115,22,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Lock size={20} color="#F97316" />
            </div>
            <div>
              <div className="fd gold" style={{ fontSize: 22, fontWeight: 700 }}>Admin Panel</div>
              <div className="fb" style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Gentleman's Kitchen</div>
            </div>
          </div>
          {isPage ? (
            <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: 13, fontFamily: 'Outfit, sans-serif' }}>
              <ArrowLeft size={16} /> Back to site
            </a>
          ) : (
            <button onClick={() => setAdminOpen(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}>
              <X size={22} />
            </button>
          )}
        </div>

        {/* PIN screen */}
        {!authed ? (
          <div style={{ padding: '56px 32px', textAlign: 'center' }}>
            <div style={{ width: 70, height: 70, borderRadius: '50%', background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <Lock size={30} color="rgba(249,115,22,0.6)" />
            </div>
            <h3 className="fd" style={{ fontSize: 26, color: '#fff', marginBottom: 8 }}>Staff Access Only</h3>
            <p className="fb" style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginBottom: 36 }}>Enter your admin PIN to continue</p>
            <input
              type="password"
              value={pinInput}
              onChange={e => { setPinInput(e.target.value); setPinError(false); }}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              placeholder="• • • • • •"
              maxLength={6}
              className="fb"
              style={{ width: '100%', maxWidth: 280, padding: '16px 20px', borderRadius: 14, background: 'rgba(255,255,255,0.05)', border: `1.5px solid ${pinError ? '#ef4444' : 'rgba(249,115,22,0.25)'}`, color: '#fff', fontSize: 22, textAlign: 'center', letterSpacing: '0.3em', outline: 'none', marginBottom: 12, display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
              autoFocus
            />
            {pinError && <p className="fb" style={{ color: '#ef4444', fontSize: 13, marginBottom: 20 }}>❌ Wrong PIN. Try again.</p>}
            <button className="btn-gold fb" onClick={handleLogin} style={{ padding: '14px 48px', borderRadius: 50, fontSize: 15, marginTop: 8 }}>Unlock</button>
            <p className="fb" style={{ fontSize: 11, color: 'rgba(255,255,255,0.15)', marginTop: 28 }}>Restricted to Gentleman's Kitchen staff only</p>
          </div>
        ) : (
          <>
            <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <AlertTriangle size={18} color="#F97316" />
                <span className="fb" style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Holiday / Break Notice</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, padding: '14px 18px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div>
                  <div className="fb" style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>Show Banner on Website</div>
                  <div className="fb" style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>Displays a notice at the top of the site</div>
                </div>
                <button style={{ cursor: 'pointer', border: 'none', background: 'none' }} onClick={() => setNoticeEdit(prev => ({ ...prev, active: !prev.active }))}>
                  {noticeEdit.active ? <ToggleRight size={34} color="#22c55e" /> : <ToggleLeft size={34} color="rgba(255,255,255,0.2)" />}
                </button>
              </div>
              <input className="admin-input fb" placeholder="e.g. We are on holiday — back soon!" value={noticeEdit.message} onChange={e => setNoticeEdit(prev => ({ ...prev, message: e.target.value }))} />
              <input className="admin-input fb" placeholder="Resuming date e.g. Monday 2nd June" value={noticeEdit.resumeDate} onChange={e => setNoticeEdit(prev => ({ ...prev, resumeDate: e.target.value }))} />
              <button className="btn-gold fb" onClick={() => handleSaveNotice(noticeEdit)} style={{ padding: '11px 28px', borderRadius: 10, fontSize: 14, marginTop: 4 }}>
                {saved ? '✅ Saved!' : 'Save Notice'}
              </button>
            </div>
            <div style={{ padding: '24px 32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <UtensilsCrossed size={18} color="#F97316" />
                <span className="fb" style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Dish Availability</span>
              </div>
              <p className="fb" style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>Toggle availability and quick delivery per dish.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {dishes.map(dish => {
                  const s = getDishSetting(settings, dish.id);
                  return (
                    <div key={dish.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                      <img src={dish.image} alt={dish.name} style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 10, flexShrink: 0 }} />
                      <div style={{ flex: 1 }}>
                        <div className="fb" style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{dish.name}</div>
                        <div className="fb gold" style={{ fontSize: 13 }}>{dish.priceNote}</div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                        <button style={{ cursor: 'pointer', border: 'none', background: 'none' }} onClick={() => toggleSetting(dish.id, 'available')}>
                          {s.available ? <ToggleRight size={28} color="#22c55e" /> : <ToggleLeft size={28} color="rgba(255,255,255,0.2)" />}
                        </button>
                        <span className="fb" style={{ fontSize: 9, color: s.available ? '#22c55e' : 'rgba(255,255,255,0.3)' }}>{s.available ? 'AVAIL.' : 'OFF'}</span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                        <button style={{ cursor: 'pointer', border: 'none', background: 'none' }} onClick={() => toggleSetting(dish.id, 'quickDelivery')}>
                          {s.quickDelivery ? <Zap size={20} color="#F97316" fill="#F97316" /> : <Zap size={20} color="rgba(255,255,255,0.2)" />}
                        </button>
                        <span className="fb" style={{ fontSize: 9, color: s.quickDelivery ? '#F97316' : 'rgba(255,255,255,0.3)' }}>QUICK</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}