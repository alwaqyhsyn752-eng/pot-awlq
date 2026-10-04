import { useEffect, useState } from 'react';
export function OfflineBadge() {
  const [online, setOnline] = useState(navigator.onLine);
  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    addEventListener('online', on); addEventListener('offline', off);
    return () => { removeEventListener('online', on); removeEventListener('offline', off); };
  }, []);
  if (online) return null;
  return <div style={{position:'fixed',top:'1rem',left:'1rem',zIndex:100,padding:'.4rem .9rem',borderRadius:'2rem',background:'rgba(255,170,0,.15)',color:'#ffaa00',fontSize:'.75rem',border:'1px solid #ffaa0044'}}>🔌 دون إنترنت</div>;
}
