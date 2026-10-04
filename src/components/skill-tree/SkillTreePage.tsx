import { useNavigate } from 'react-router-dom';
import { CopyrightFooter } from '../shared/CopyrightFooter';
const SK = [
  { id:'basics', n:'أساسيات', i:'🌱', p:100, u:true },
  { id:'vars', n:'المتغيرات', i:'📦', p:80, u:true },
  { id:'cond', n:'الشروط', i:'❓', p:60, u:true },
  { id:'loops', n:'الحلقات', i:'🔄', p:40, u:true },
  { id:'fns', n:'الدوال', i:'⚙️', p:20, u:true },
  { id:'oop', n:'OOP', i:'🏛️', p:0, u:false },
  { id:'data', n:'البيانات', i:'📊', p:0, u:false },
  { id:'web', n:'الويب', i:'🌐', p:0, u:false },
];
export function SkillTreePage() {
  const nav = useNavigate();
  return (
    <div dir="rtl" style={{minHeight:'100vh',background:'#0a0a0f',padding:'1.5rem'}}>
      <header style={{display:'flex',alignItems:'center',gap:'.75rem',marginBottom:'2rem'}}>
        <button onClick={()=>nav('/')} className="btn-secondary" style={{padding:'.5rem .9rem',fontSize:'.85rem'}}>← رجوع</button>
        <h2 style={{fontSize:'1.1rem'}}>🌳 شجرة المهارات</h2>
      </header>
      <div style={{maxWidth:'600px',margin:'0 auto',display:'grid',gap:'1rem'}}>
        {SK.map((s,i)=>(
          <div key={s.id} style={{display:'flex',alignItems:'center',gap:'1rem',padding:'1rem 1.25rem',background:'#12121a',borderRadius:'1rem',border:s.u?'1px solid #00ff8844':'1px solid #1f1f2e',opacity:s.u?1:.5,animation:`fadeIn .4s ease-out ${i*.06}s backwards`}}>
            <div style={{fontSize:'2rem'}}>{s.i}</div>
            <div style={{flex:1}}>
              <div style={{fontWeight:'bold',color:s.u?'#00ff88':'#666'}}>{s.n}</div>
              <div style={{height:'6px',background:'#1a1a2e',borderRadius:'3px',marginTop:'.5rem',overflow:'hidden'}}>
                <div style={{height:'100%',width:`${s.p}%`,background:s.u?'linear-gradient(90deg,#00ff88,#00ccff)':'#333',borderRadius:'3px'}} />
              </div>
            </div>
            <div style={{fontSize:'.8rem',color:'#666',minWidth:'40px',textAlign:'left'}}>{s.p}%</div>
          </div>
        ))}
      </div>
      <CopyrightFooter />
    </div>
  );
}
