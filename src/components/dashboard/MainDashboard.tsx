import { useNavigate } from 'react-router-dom';
import { OfflineBadge } from '../shared/OfflineBadge';
import { CopyrightFooter } from '../shared/CopyrightFooter';
const S = [
  { id:'teacher', t:'المعلم البنّاء', s:'تعلّم البرمجة بأسلوب تفاعلي هجين', i:'🏫', c:'#00ff88', p:'/teacher' },
  { id:'wallet', t:'حافظة ما بنيت', s:'مشاريعك المحفوظة', i:'📁', c:'#a855f7', p:'/portfolio' },
  { id:'fixer', t:'تصحيح أخطاء الأكواد', s:'حلّل وأصلح الأكواد الجاهزة', i:'🔧', c:'#f97316', p:'/error-fixer' },
  { id:'skills', t:'شجرة المهارات', s:'اكتشف مهاراتك البرمجية', i:'🌳', c:'#06b6d4', p:'/skill-tree' },
];
export function MainDashboard() {
  const nav = useNavigate();
  return (
    <div dir="rtl" style={{minHeight:'100vh',padding:'1.5rem',background:'#0a0a0f'}}>
      <OfflineBadge />
      <header style={{textAlign:'center',margin:'3rem 0 2.5rem'}}>
        <h1 style={{fontSize:'clamp(1.5rem,6vw,2.5rem)',fontWeight:'bold',background:'linear-gradient(90deg,#00ff88,#00ccff)',WebkitBackgroundClip:'text',backgroundClip:'text',WebkitTextFillColor:'transparent'}}>فكرتك لبناء المستقبل</h1>
        <p style={{color:'#666',marginTop:'.5rem',fontSize:'.9rem'}}>pot-awlq — بيئة التطوير التعليمية الهجينة</p>
      </header>
      <main style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'1rem',maxWidth:'900px',margin:'0 auto'}}>
        {S.map((s,i)=>(
          <button key={s.id} className="dash-card" style={{animationDelay:`${i*.08}s`,borderColor:`${s.c}33`}} onClick={()=>nav(s.p)}>
            <span style={{fontSize:'2.5rem',display:'block',marginBottom:'.75rem'}}>{s.i}</span>
            <h2 style={{fontSize:'1.15rem',fontWeight:'bold',color:s.c}}>{s.t}</h2>
            <p style={{color:'#888',fontSize:'.85rem',marginTop:'.35rem'}}>{s.s}</p>
          </button>
        ))}
      </main>
      <nav style={{display:'flex',justifyContent:'center',gap:'.75rem',marginTop:'2rem',flexWrap:'wrap'}}>
        <button className="btn-secondary" onClick={()=>nav('/quiz')}>🧪 مركز الاختبارات</button>
        <button className="btn-secondary" onClick={()=>nav('/settings')}>⚙️ الإعدادات</button>
      </nav>
      <CopyrightFooter />
    </div>
  );
}
