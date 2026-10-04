import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CopyrightFooter } from '../shared/CopyrightFooter';

const STARTER = {
  python: '# اكتب كودك هنا\nprint("السلام عليكم")\n',
  javascript: '// اكتب كودك هنا\nconsole.log("مرحباً");\n',
};

export function TeacherIDE() {
  const nav = useNavigate();
  const [mode, setMode] = useState<'structured'|'blank'>('blank');
  const [lang, setLang] = useState<'python'|'javascript'>('python');
  const [code, setCode] = useState(STARTER.python);
  const [output, setOutput] = useState('');
  const [hint, setHint] = useState('');
  const [grade, setGrade] = useState<{score:number;grade:string;suggestions:string[]}|null>(null);

  const analyze = (val: string) => {
    const issues: string[] = [];
    if (/print\s+[^(]/.test(val)) issues.push('🔮 print يحتاج أقواساً! ما رمز الدخول للدالة؟');
    if (/[（）：，]/.test(val)) issues.push('🔮 استخدمت رموزاً غير إنجليزية! أعد النظر بالأقواس.');
    if (/=\s*$/m.test(val)) issues.push('🔮 إسناد بدون قيمة! ما الذي تريد إخبار الحاسوب به؟');
    setHint(issues[0] || '');
  };

  const run = () => {
    setOutput('⏳ جاري التنفيذ...');
    try {
      if (lang === 'javascript') {
        const logs: string[] = [];
        new Function('console', code)({ log: (...a: any[]) => logs.push(a.map(String).join(' ')) });
        setOutput(logs.join('\n') || '(لا يوجد مخرجات)');
      } else {
        const logs: string[] = [];
        for (const line of code.split('\n')) {
          const m = line.match(/print\s*\(\s*["'](.+?)["']\s*\)/);
          if (m) logs.push(m[1]);
        }
        setOutput(logs.join('\n') || '(لا يوجد مخرجات)');
      }
      // التقييم
      const lines = code.split('\n');
      const hasErr = /try|except|catch/.test(code);
      const hasComments = lines.some(l => l.trim().startsWith('#') || l.trim().startsWith('//'));
      const score = Math.min(100, 50 + (hasErr?25:0) + (hasComments?15:0) + Math.min(lines.length,10));
      const g = score>=90?'A+':score>=80?'A':score>=70?'B':score>=60?'C':'D';
      const sugg: string[] = [];
      if (!hasErr) sugg.push('🔧 أضف معالجة للأخطاء (try/except)');
      if (!hasComments) sugg.push('💬 أضف تعليقات توضيحية');
      setGrade({ score, grade: g, suggestions: sugg });
    } catch (e: any) {
      setOutput('❌ ' + (e.message || e));
    }
  };

  return (
    <div dir="rtl" style={{minHeight:'100vh',background:'#0a0a0f',display:'flex',flexDirection:'column'}}>
      <header style={{padding:'1rem',borderBottom:'1px solid #1a1a2e',display:'flex',alignItems:'center',gap:'.75rem',flexWrap:'wrap'}}>
        <button onClick={()=>nav('/')} className="btn-secondary" style={{padding:'.5rem .9rem',fontSize:'.85rem'}}>← رجوع</button>
        <h2 style={{fontSize:'1.1rem',flex:1}}>🏫 المعلم البنّاء</h2>
        <select value={lang} onChange={e=>{setLang(e.target.value as any);setCode(STARTER[e.target.value as 'python'|'javascript']);}} style={{padding:'.5rem',borderRadius:'.5rem',background:'#12121a',color:'#e0e0e0',border:'1px solid #1f1f2e'}}>
          <option value="python">🐍 Python</option>
          <option value="javascript">🟨 JavaScript</option>
        </select>
      </header>

      <div style={{display:'flex',gap:'.5rem',padding:'.75rem 1rem',borderBottom:'1px solid #1a1a2e'}}>
        <button onClick={()=>setMode('structured')} className={mode==='structured'?'btn-primary':'btn-secondary'} style={{padding:'.4rem .9rem',fontSize:'.85rem'}}>📐 هيكلي</button>
        <button onClick={()=>setMode('blank')} className={mode==='blank'?'btn-primary':'btn-secondary'} style={{padding:'.4rem .9rem',fontSize:'.85rem'}}>✨ حر</button>
      </div>

      <div style={{flex:1,display:'flex',flexDirection:'column',padding:'1rem',gap:'1rem'}}>
        {mode==='structured' && (
          <div style={{display:'grid',gap:'.5rem'}}>
            {['الأساسيات','المتغيرات','الشروط','الحلقات','الدوال'].map(s=>(
              <div key={s} style={{padding:'.75rem',background:'#12121a',borderRadius:'.5rem',border:'1px solid #1f1f2e'}}>
                <div style={{color:'#00ff88',fontSize:'.9rem',marginBottom:'.4rem'}}>▸ {s}</div>
                <div style={{color:'#555',fontSize:'.8rem'}}>اكتب كودك هنا...</div>
              </div>
            ))}
          </div>
        )}

        <textarea value={code} onChange={e=>{setCode(e.target.value);analyze(e.target.value);}} dir="ltr" spellCheck={false}
          style={{flex:1,minHeight:'200px',padding:'1rem',background:'#0e0e15',color:'#e0e0e0',border:'1px solid #1f1f2e',borderRadius:'.75rem',fontFamily:'ui-monospace,monospace',fontSize:'14px',lineHeight:'1.6',resize:'none',outline:'none'}} />

        {hint && <div style={{padding:'.85rem 1rem',borderRadius:'.75rem',background:'rgba(0,255,136,.08)',border:'1px solid #00ff8844',color:'#00ff88',fontSize:'.9rem',lineHeight:'1.6'}}>{hint}</div>}

        <div style={{display:'flex',gap:'.5rem',flexWrap:'wrap'}}>
          <button className="btn-primary" onClick={run}>▶️ تشغيل</button>
          <button className="btn-secondary" onClick={()=>{setCode('');setOutput('');setHint('');setGrade(null);}}>🗑 مسح</button>
          {grade && <div style={{padding:'.5rem 1rem',borderRadius:'.75rem',background:grade.score>=80?'rgba(0,255,136,.15)':'rgba(255,200,0,.15)',color:grade.score>=80?'#00ff88':'#ffcc00',fontWeight:'bold',fontSize:'.9rem'}}>الدرجة: {grade.grade} ({grade.score}%)</div>}
        </div>

        {output && <pre style={{padding:'1rem',background:'#0e0e15',color:'#00ff88',borderRadius:'.75rem',border:'1px solid #1f1f2e',fontSize:'.85rem',whiteSpace:'pre-wrap',maxHeight:'200px',overflow:'auto',fontFamily:'ui-monospace,monospace',direction:'ltr',textAlign:'left'}}>{output}</pre>}

        {grade && grade.suggestions.length > 0 && (
          <div style={{padding:'.75rem',background:'#12121a',borderRadius:'.75rem',border:'1px solid #1f1f2e'}}>
            <div style={{color:'#00ccff',fontSize:'.85rem',marginBottom:'.5rem'}}>📋 اقتراحات:</div>
            {grade.suggestions.map((s,i)=><div key={i} style={{color:'#888',fontSize:'.8rem',padding:'.2rem 0'}}>{s}</div>)}
          </div>
        )}
      </div>
      <CopyrightFooter />
    </div>
  );
}
