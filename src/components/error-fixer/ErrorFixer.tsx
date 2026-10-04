import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CopyrightFooter } from '../shared/CopyrightFooter';
export function ErrorFixer() {
  const nav = useNavigate();
  const [code, setCode] = useState('');
  const [analysis, setAnalysis] = useState('');
  const analyze = () => {
    const issues: string[] = [];
    if (/print\s+[^(]/.test(code)) issues.push('❌ print() يحتاج أقواساً');
    if (/[（）：，]/.test(code)) issues.push('❌ رموز غير إنجليزية');
    if (/=\s*$/m.test(code)) issues.push('⚠️ إسناد بدون قيمة');
    if (!/try|except|catch/.test(code) && code.split('\n').length > 15) issues.push('💡 أضف معالجة للأخطاء');
    setAnalysis(issues.length ? issues.join('\n\n') : '✅ لا توجد أخطاء شائعة.');
  };
  return (
    <div dir="rtl" style={{minHeight:'100vh',background:'#0a0a0f',padding:'1.5rem'}}>
      <header style={{display:'flex',alignItems:'center',gap:'.75rem',marginBottom:'1.5rem'}}>
        <button onClick={()=>nav('/')} className="btn-secondary" style={{padding:'.5rem .9rem',fontSize:'.85rem'}}>← رجوع</button>
        <h2 style={{fontSize:'1.1rem'}}>🔧 تصحيح الأخطاء</h2>
      </header>
      <textarea value={code} onChange={e=>setCode(e.target.value)} dir="ltr" placeholder="// الصق الكود..." style={{width:'100%',minHeight:'300px',padding:'1rem',background:'#0e0e15',color:'#e0e0e0',border:'1px solid #1f1f2e',borderRadius:'.75rem',fontFamily:'ui-monospace,monospace',fontSize:'14px',resize:'vertical',outline:'none'}} />
      <div style={{display:'flex',gap:'.5rem',marginTop:'1rem'}}>
        <button className="btn-primary" onClick={analyze}>🔍 تحليل</button>
      </div>
      {analysis && <pre style={{marginTop:'1rem',padding:'1rem',background:'#12121a',borderRadius:'.75rem',border:'1px solid #1f1f2e',color:'#e0e0e0',fontSize:'.85rem',whiteSpace:'pre-wrap',fontFamily:'system-ui,sans-serif',textAlign:'right'}}>{analysis}</pre>}
      <CopyrightFooter />
    </div>
  );
}
