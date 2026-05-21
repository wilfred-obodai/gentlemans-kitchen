import { AlertTriangle } from 'lucide-react';
import { Notice } from '../types';

interface HolidayBannerProps {
  notice: Notice;
}

export function HolidayBanner({ notice }: HolidayBannerProps) {
  if (!notice.active || !notice.message) return null;

  return (
    <div className="holiday-banner banner-pulse">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
        <AlertTriangle size={16} color="#F97316" />
        <span className="fb" style={{ fontSize: 14, color: '#fff', fontWeight: 600 }}>{notice.message}</span>
        {notice.resumeDate && (
          <span className="fb" style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
            — Resuming: <strong style={{ color: '#F97316' }}>{notice.resumeDate}</strong>
          </span>
        )}
        <AlertTriangle size={16} color="#F97316" />
      </div>
    </div>
  );
}
