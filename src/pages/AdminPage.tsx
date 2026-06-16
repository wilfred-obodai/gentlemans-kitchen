import { useState } from 'react';
import { AdminPanel } from '../components/AdminPanel';
import { DISHES } from '../data/dishes';
import { loadSettings, saveSettings, loadNotice, saveNotice, getDishSetting } from '../data/storage';
import { DishSettings, Notice } from '../types';
import '../styles/globals.css';

export default function AdminPage() {
  const [settings, setSettings] = useState<DishSettings>(loadSettings);
  const [notice, setNotice] = useState<Notice>(loadNotice);

  const toggleSetting = (id: number, key: 'available' | 'quickDelivery') => {
    const current = getDishSetting(settings, id);
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
      dishes={DISHES}
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