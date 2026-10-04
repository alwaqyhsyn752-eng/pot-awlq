import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CopyrightFooter } from '../shared/CopyrightFooter';
const Q = [
  { q:'ما ناتج print(2 + 3)؟', a:['5','23','خطأ','لا شيء'], c:0 },
  { q:'كيف نعرّف متغيراً في Python؟', a:['var x = 5','let x = 5','x = 5','int x = 5'], c:2 },
  { q:'ما وظيفة الحلقة for؟', a:['الشرط','التكرار','الدوال','لا شيء'], c:1 },
  { q:'في JavaScript، ما الأمر لطباعة نص؟', a:['print()','echo','console.log()','write()'], c:2 },
  { q:'ما ناتج len("مرحبا")؟', a:['4','5','6','خطأ'], c:1 },
];
export function QuizCenter() {
  const nav = useNavigate();
  const [idx, setIdx] = useState(0);
  const [sel, setSel] = useState<number|null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const answer = (i:number) => {
    if (sel !== null) return;
    setSel(i);
    if (i === Q[idx].c) setScore(s => s+1);
    setTimeout(()=>{
      if (idx < Q.length-1) { setIdx(idx+1); setSel(null); } else setDone(true);
    }, 900);
  };
  return (
    <div dir="rtl" style={{minHeight:'100vh',background:'#0a0a0f',padding:'1.5rem'}}>
      <header style={{display:'flex',alignItems:'center',gap:'.75rem',marginBottom:'2rem'}}>
        <button onClick={()=>nav('/')} className="btn-secondary" style={{padding:'.5rem .9rem',fontSize:'.85rem'}}>← رجوع</button>
        <h2 style={{fontSize:'1.1rem'}}>🧪 مركز الاختبارات</h2>
      </header>
      {!done ? (
        <div style={{maxWidth:'600px',margin:'0 auto'}}>
          <div style={{color:'#666',fontSize:'.85rem',marginBottom:'.5rem'}}>السؤال {idx+1} من {Q.length}</div>
          <div style={{height:'4px',background:'#1a1a2e',borderRadius:'2px',marginBottom:'1.5rem',overflow:'hidden'}}>
            <div style={{height:'100%',width:`${((idx+1)/Q.length)*100}%`,background:'#00ff88'}} />
          </div>
          <h3 style={{fontSize:'1.15rem',marginBottom:'1.5rem',lineHeight:'1.6'}}>{Q[idx].q}</h3>
          <div style={{display:'grid',gap:'.75rem'}}>
            {Q[idx].a.map((opt,i)=>{
              const isC = i===Q[idx].c, isS = i===sel;
              return (
                <button key={i} onClick={()=>answer(i)} disabled={sel!==null} style={{
                  padding:'1rem',
                  background: sel===null ? '#12121a' : isC ? 'rgba(0,255,136,.15)' : isS ? 'rgba(255,51,51,.15)' : '#12121a',
                  border: `1px solid ${sel===null ? '#1f1f2e' : isC ? '#00ff88' : isS ? '#ff3333' : '#1f1f2e'}`,
                  borderRadius:'.75rem', textAlign:'right', color:'#e0e0e0', fontSize:'.95rem'
                }}>{opt}</button>
              );
            })}
          </div>
        </div>
      ) : (
        <div style={{maxWidth:'500px',margin:'4rem auto',textAlign:'center'}}>
          <div style={{fontSize:'4rem',marginBottom:'1rem'}}>{score===Q.length?'🏆':score>=Q.length/2?'🎉':'📚'}</div>
          <h2 style={{color:'#00ff88',fontSize:'1.5rem',marginBottom:'1rem'}}>نتيجتك: {score} / {Q.length}</h2>
          <button className="btn-primary" onClick={()=>{setIdx(0);setSel(null);setScore(0);setDone(false);}}>🔄 إعادة</button>
        </div>
      )}
      <CopyrightFooter />
    </div>
  );
}
