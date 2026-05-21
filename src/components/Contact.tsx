import { Phone, MapPin, Clock, Instagram } from 'lucide-react';
import { CONTACT_INFO } from '../data/dishes';
import { WASvg } from './WASvg';

export function Contact() {
  return (
    <section id="contact" style={{ padding: '100px 24px', background: '#110d07' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 68 }}>
          <p className="fb gold" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 14 }}>Come Dine With Us</p>
          <h2 className="fd" style={{ fontSize: 'clamp(34px, 5vw, 56px)', fontWeight: 700, color: '#fff', lineHeight: 1.15 }}>
            Visit <em className="gold">Gentleman's Kitchen</em>
          </h2>
          <div className="divider" style={{ maxWidth: 100, margin: '22px auto 0' }} />
        </div>

        <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 52 }}>

          {/* Contact details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {[
              { icon: <Phone size={20} color="#F97316" />, title: 'Call Us', value: CONTACT_INFO.phone1, sub: CONTACT_INFO.phone2 },
              { icon: <MapPin size={20} color="#F97316" />, title: 'Location', value: CONTACT_INFO.location, sub: CONTACT_INFO.city },
              { icon: <Clock size={20} color="#F97316" />, title: 'Hours', value: CONTACT_INFO.opensAt, sub: CONTACT_INFO.foodReady },
              { icon: <Instagram size={20} color="#F97316" />, title: 'Instagram', value: `@${CONTACT_INFO.instagram}`, sub: 'Follow us for daily specials' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                <div style={{ minWidth: 46, height: 46, borderRadius: 12, background: 'rgba(249,115,22,0.09)', border: '1px solid rgba(249,115,22,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="fd gold" style={{ fontSize: 19, fontWeight: 700, marginBottom: 3 }}>{item.title}</h3>
                  <p className="fb" style={{ fontSize: 16, color: '#fff', marginBottom: 2 }}>{item.value}</p>
                  <p className="fb" style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)' }}>{item.sub}</p>
                </div>
              </div>
            ))}

            {/* CTA buttons */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
              <a
                href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa fb"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '13px 24px', borderRadius: 50, fontSize: 15, textDecoration: 'none' }}
              >
                <WASvg /> WhatsApp
              </a>
              <a
                href={`tel:+${CONTACT_INFO.whatsapp}`}
                className="btn-call fb"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '13px 24px', borderRadius: 50, fontSize: 15, textDecoration: 'none' }}
              >
                <Phone size={16} /> Call Us
              </a>
            </div>
          </div>

          {/* Location card */}
          <div style={{ borderRadius: 24, border: '1.5px solid rgba(249,115,22,0.22)', overflow: 'hidden', background: 'linear-gradient(145deg, #1c1509, #100c05)', boxShadow: '0 30px 80px rgba(0,0,0,0.4)' }}>
            <div style={{ height: 260, position: 'relative', overflow: 'hidden' }}>
              <img
                src="/images/sauce1.jpeg"
                alt="Food"
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6) saturate(0.9)' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(249,100,10,0.2) 0%, transparent 65%)' }} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <div style={{ width: 54, height: 54, borderRadius: '50%', background: '#F97316', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', boxShadow: '0 0 28px rgba(249,115,22,0.7)' }}>
                  <MapPin size={22} color="#fff" />
                </div>
                <div className="fd" style={{ fontSize: 18, fontWeight: 700, color: '#fff', textShadow: '0 2px 12px rgba(0,0,0,0.9)' }}>Gentleman's Kitchen</div>
              </div>
            </div>
            <div style={{ padding: '26px 30px' }}>
              <h3 className="fd gold" style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Find Us at Greda Estate</h3>
              <p className="fb" style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, marginBottom: 22 }}>
                Teshie, Accra, Ghana · We Do Delivery!
              </p>
              <a
                href={CONTACT_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline fb"
                style={{ display: 'inline-block', padding: '10px 24px', borderRadius: 50, fontSize: 13, textDecoration: 'none', fontWeight: 600 }}
              >
                Open in Google Maps ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}