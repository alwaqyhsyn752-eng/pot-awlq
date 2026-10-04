import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CopyrightFooter } from '../shared/CopyrightFooter';
export function SettingsPanel() {
  const nav = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem('pot-theme')||'cyberpunk');
  const [fb, setFb] = useState('');
  const send = () => {
    const body = encodeURIComponent(`رسالة من pot-awlq:\n\n${fb}\n\n— © @حسين غلاب 2026`);
    location.href = `mailto:alwaqyhsyn752-eng@users.noreply.github.com?subject=${encodeURIComponent('pot-awlq')}&body=${body}`;
  };
  return (
    <div dir="rtl" style={{minHeight:'100vh',background:'#0a0a0f',padding:'1.5rem'}}>
      <header style={{display:'flex',alignItems:'center',gap:'.75rem',marginBottom:'2rem'}}>
        <button onClick={()=>nav('/')} className="btn-secondary" style={{padding:'.5rem .9rem',fontSize:'.85rem'}}>← رجوع</button>
        <h2 style={{fontSize:'1.1rem'}}>⚙️ الإعدادات</h2>
      </header>
      <div style={{maxWidth:'600px',margin:'0 auto',display:'grid',gap:'1.25rem'}}>
        <section style={{padding:'1.25rem',background:'#12121a',borderRadius:'1rem',border:'1px solid #1f1f2e'}}>
          <h3 style={{fontSize:'1rem',marginBottom:'1rem',color:'#00ff88'}}>🎨 المظهر</h3>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'.5rem'}}>
            {[{id:'cyberpunk',n:'Cyberpunk',c:'#00ff88'},{id:'crystal',n:'Crystal',c:'#00ccff'},{id:'minimal',n:'Minimal',c:'#888'}].map(t=>(
              <button key={t.id} onClick={()=>{setTheme(t.id);localStorage.setItem('pot-theme',t.id);}} style={{
                padding:'.75rem',background:theme===t.id?'rgba(0,255,136,.1)':'#0e0e15',
                border:`1px solid ${theme===t.id?t.c:'#1f1f2e'}`,borderRadius:'.5rem',
                color:theme===t.id?t.c:'#888',fontSize:'.85rem'
              }}>{t.n}</button>
            ))}
          </div>
        </section>
        <section style={{padding:'1.25rem',background:'#12121a',borderRadius:'1rem',border:'1px solid #1f1f2e'}}>
          <h3 style={{fontSize:'1rem',marginBottom:'1rem',color:'#00ff88'}}>💬 الاقتراحات</h3>
          <textarea value={fb} onChange={e=>setFb(e.target.value)} placeholder="اكتب اقتراحك..." style={{width:'100%',minHeight:'100px',padding:'.75rem',background:'#0e0e15',color:'#e0e0e0',border:'1px solid #1f1f2e',borderRadius:'.5rem',resize:'vertical',outline:'none',fontFamily:'inherit',fontSize:'.9rem'}} />
          <button className="btn-primary" onClick={send} disabled={!fb.trim()} style={{marginTop:'.75rem',opacity:fb.trim()?1:.5}}>📧 إرسال</button>
        </section>
        <section style={{padding:'1.25rem',background:'#12121a',borderRadius:'1rem',border:'1px solid #1f1f2e',textAlign:'center',color:'#666',fontSize:'.85rem'}}>
          <div>pot-awlq v1.0.0</div>
          <div style={{marginTop:'.35rem'}}>© @حسين غلاب 2026</div>
        </section>
      </div>
      <CopyrightFooter />
    </div>
  );
}
