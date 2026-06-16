import { useState } from 'react';
import { AdminPanel } from '../components/AdminPanel';
import { loadSettings, saveSettings, loadNotice, saveNotice, getDishSetting } from '../data/storage';
import { DishSettings, Notice } from '../types';
import '../styles/globals.css';

export default function AdminPage() {
  const [settings, setSettings] = useState<DishSettings>(loadSettings);
  const [notice, setNotice] = useState<Notice>(loadNotice);

  const toggleSetting = (id: string, key: 'available' | 'quickDelivery') => {
    const current = (settings as any)[id] ?? { available: true, quickDelivery: false };
    const updated = { ...settings, [id]: { ...current, [key]: !current[key] } };
    setSettings(updated);
    saveSettings(updated);
  };

  const handleSaveNotice = (n: Notice) => {
    setNotice(n);
    saveNotice(n);
  };

  return (
    <AdminPanel
      dishes={[]}
      settings={settings}
      notice={notice}
      adminOpen={true}
      setAdminOpen={() => {}}
      toggleSetting={toggleSetting}
      saveNoticeSettings={handleSaveNotice}
      isPage={true}
    />
  );
}