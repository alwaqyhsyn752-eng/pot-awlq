import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CopyrightFooter } from '../shared/CopyrightFooter';
interface P { id:string; name:string; language:string; updatedAt:number; }
export function PortfolioWallet() {
  const nav = useNavigate();
  const [projects, setProjects] = useState<P[]>([]);
  useEffect(()=>{ const s=localStorage.getItem('pot-projects'); if(s) setProjects(JSON.parse(s)); },[]);
  const exportHtml = () => {
    const html = `<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>معرض الأعمال</title><style>body{background:#0a0a0f;color:#e0e0e0;font-family:system-ui;padding:2rem;direction:rtl}h1{color:#00ff88;text-align:center}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1rem;max-width:1100px;margin:2rem auto}.card{background:#12121a;padding:1.5rem;border-radius:12px;border:1px solid #1f1f2e}.lang{color:#00ccff;font-size:.8rem}footer{text-align:center;color:#555;margin-top:3rem}</style></head><body><h1>معرض الأعمال</h1><div class="grid">${projects.map(p=>`<div class="card"><div class="lang">${p.language}</div><h3>${p.name}</h3></div>`).join('')}</div><footer>© @حسين غلاب 2026 — pot-awlq</footer></body></html>`;
    const blob = new Blob([html],{type:'text/html'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = 'portfolio.html'; a.click();
  };
  return (
    <div dir="rtl" style={{minHeight:'100vh',background:'#0a0a0f',padding:'1.5rem'}}>
      <header style={{display:'flex',alignItems:'center',gap:'.75rem',marginBottom:'1.5rem',flexWrap:'wrap'}}>
        <button onClick={()=>nav('/')} className="btn-secondary" style={{padding:'.5rem .9rem',fontSize:'.85rem'}}>← رجوع</button>
        <h2 style={{fontSize:'1.1rem',flex:1}}>📁 حافظة ما بنيت</h2>
        <button className="btn-primary" style={{padding:'.5rem 1rem',fontSize:'.85rem'}} onClick={exportHtml}>📤 تصدير</button>
      </header>
      {projects.length===0 ? (
        <div style={{textAlign:'center',padding:'4rem 1rem',color:'#666'}}>
          <div style={{fontSize:'3rem',marginBottom:'1rem'}}>📂</div>
          <p>لا توجد مشاريع محفوظة بعد.</p>
        </div>
      ) : (
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:'1rem'}}>
          {projects.map(p=>(
            <div key={p.id} style={{padding:'1.25rem',background:'#12121a',borderRadius:'1rem',border:'1px solid #1f1f2e'}}>
              <div style={{color:'#00ccff',fontSize:'.75rem'}}>{p.language}</div>
              <h3 style={{marginTop:'.5rem',fontSize:'1rem'}}>{p.name}</h3>
            </div>
          ))}
        </div>
      )}
      <CopyrightFooter />
    </div>
  );
}
