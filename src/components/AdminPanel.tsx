import { useState } from 'react';
import { X, Lock, ToggleLeft, ToggleRight, Zap, AlertTriangle, UtensilsCrossed } from 'lucide-react';
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
}

const ADMIN_PIN = '1234';

export function AdminPanel({
  dishes, settings, notice, adminOpen, setAdminOpen,
  toggleSetting, saveNoticeSettings,
}: AdminProps) {
  const [authed, setAuthed] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [noticeEdit, setNoticeEdit] = useState<Notice>(notice);

  if (!adminOpen) return null;

  const handleClose = () => { setAdminOpen(false); setAuthed(false); setPinInput(''); };

  const handleLogin = () => {
    if (pinInput === ADMIN_PIN) { setAuthed(true); setPinError(false); }
    else { setPinError(true); setPinInput(''); }
  };

  return (
    <div className="admin-overlay">
      <div className="admin-panel">

        {/* Header */}
        <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(249,115,22,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Lock size={18} color="#F97316" />
            </div>
            <div>
              <div className="fd gold" style={{ fontSize: 22, fontWeight: 700 }}>Admin Panel</div>
              <div className="fb" style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Gentleman's Kitchen</div>
            </div>
          </div>
          <button onClick={handleClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}>
            <X size={22} />
          </button>
        </div>

        {/* PIN screen */}
        {!authed ? (
          <div style={{ padding: '48px 32px', textAlign: 'center' }}>
            <Lock size={40} color="rgba(249,115,22,0.4)" style={{ margin: '0 auto 20px' }} />
            <h3 className="fd" style={{ fontSize: 22, color: '#fff', marginBottom: 8 }}>Enter Admin PIN</h3>
            <p className="fb" style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginBottom: 28 }}>Only for restaurant staff</p>
            <input
              type="password"
              value={pinInput}
              onChange={e => { setPinInput(e.target.value); setPinError(false); }}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              placeholder="Enter PIN"
              maxLength={6}
              className="fb"
              style={{ width: '100%', maxWidth: 260, padding: '14px 18px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: `1.5px solid ${pinError ? '#ef4444' : 'rgba(249,115,22,0.25)'}`, color: '#fff', fontSize: 18, textAlign: 'center', letterSpacing: '0.2em', outline: 'none', marginBottom: 16 }}
              autoFocus
            />
            {pinError && <p className="fb" style={{ color: '#ef4444', fontSize: 13, marginBottom: 16 }}>Wrong PIN. Try again.</p>}
            <br />
            <button className="btn-gold fb" onClick={handleLogin} style={{ padding: '13px 36px', borderRadius: 50, fontSize: 15 }}>Unlock</button>
            <p className="fb" style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', marginTop: 20 }}>Default PIN: 1234 — change before launch</p>
          </div>
        ) : (
          <>
            {/* Holiday notice */}
            <div className="admin-section">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <AlertTriangle size={18} color="#F97316" />
                <span className="fb" style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Holiday / Break Notice</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, padding: '12px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div>
                  <div className="fb" style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>Show Banner on Website</div>
                  <div className="fb" style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Displays your message at the top of the site</div>
                </div>
                <button className="admin-toggle" onClick={() => setNoticeEdit(prev => ({ ...prev, active: !prev.active }))}>
                  {noticeEdit.active ? <ToggleRight size={32} color="#22c55e" /> : <ToggleLeft size={32} color="rgba(255,255,255,0.25)" />}
                </button>
              </div>
              <input className="admin-input fb" placeholder="e.g. We are on holiday or Kitchen closed today" value={noticeEdit.message} onChange={e => setNoticeEdit(prev => ({ ...prev, message: e.target.value }))} />
              <input className="admin-input fb" placeholder="Resuming date e.g. Monday 26th May 2025" value={noticeEdit.resumeDate} onChange={e => setNoticeEdit(prev => ({ ...prev, resumeDate: e.target.value }))} />
              <button className="btn-gold fb" onClick={() => saveNoticeSettings(noticeEdit)} style={{ padding: '11px 24px', borderRadius: 10, fontSize: 14, marginTop: 4 }}>
                Save Notice
              </button>
            </div>

            {/* Dish management */}
            <div className="admin-section" style={{ borderBottom: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <UtensilsCrossed size={18} color="#F97316" />
                <span className="fb" style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Dish Availability</span>
              </div>
              <p className="fb" style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>Toggle availability and quick delivery per dish.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {dishes.map(dish => {
                  const s = getDishSetting(settings, dish.id);
                  return (
                    <div key={dish.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                      <img src={dish.image} alt={dish.name} style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 10, flexShrink: 0 }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="fb" style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{dish.name}</div>
                        <div className="fb gold" style={{ fontSize: 13 }}>{dish.priceNote}</div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                        <button className="admin-toggle" onClick={() => toggleSetting(dish.id, 'available')}>
                          {s.available ? <ToggleRight size={28} color="#22c55e" /> : <ToggleLeft size={28} color="rgba(255,255,255,0.25)" />}
                        </button>
                        <span className="fb" style={{ fontSize: 9, color: s.available ? '#22c55e' : 'rgba(255,255,255,0.3)', letterSpacing: '0.05em' }}>
                          {s.available ? 'AVAIL.' : 'OFF'}
                        </span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                        <button className="admin-toggle" onClick={() => toggleSetting(dish.id, 'quickDelivery')}>
                          {s.quickDelivery ? <Zap size={20} color="#F97316" fill="#F97316" /> : <Zap size={20} color="rgba(255,255,255,0.2)" />}
                        </button>
                        <span className="fb" style={{ fontSize: 9, color: s.quickDelivery ? '#F97316' : 'rgba(255,255,255,0.3)', letterSpacing: '0.05em' }}>QUICK</span>
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
