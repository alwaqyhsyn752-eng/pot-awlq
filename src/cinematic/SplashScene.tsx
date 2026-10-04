import { useEffect, useRef } from 'react';
export function SplashScene({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let raf = 0, t = 0;
    const resize = () => { canvas.width = innerWidth; canvas.height = innerHeight; };
    resize();
    addEventListener('resize', resize);
    const draw = () => {
      t += 0.016;
      const W = canvas.width, H = canvas.height;
      ctx.fillStyle = '#000'; ctx.fillRect(0,0,W,H);
      const cx = W/2, cy = H/2;
      if (t < 2.5) {
        const o = Math.min(t/1.5,1);
        const grad = ctx.createRadialGradient(cx,cy,5,cx,cy,300);
        grad.addColorStop(0,`rgba(170,220,255,${o*0.6})`);
        grad.addColorStop(1,'transparent');
        ctx.fillStyle = grad; ctx.fillRect(0,0,W,H);
        ctx.strokeStyle = `rgba(255,255,255,${o})`;
        ctx.lineWidth = 2; ctx.shadowBlur = 30; ctx.shadowColor = '#aaccff';
        ctx.strokeRect(cx-30, cy-60, 60, 120); ctx.shadowBlur = 0;
      }
      if (t >= 2.5 && t < 5) {
        const s = Math.min((t-2.5),1);
        const grad = ctx.createRadialGradient(cx,cy,10,cx,cy,200*s);
        grad.addColorStop(0,'rgba(0,255,136,.3)'); grad.addColorStop(1,'transparent');
        ctx.fillStyle = grad; ctx.fillRect(0,0,W,H);
        ctx.strokeStyle='#00ff88'; ctx.lineWidth=2; ctx.shadowBlur=15; ctx.shadowColor='#00ff88';
        ctx.beginPath(); ctx.arc(cx,cy-20,60*s,0,Math.PI*2); ctx.stroke();
        for (let i=0;i<12;i++){
          const a=(i/12)*Math.PI*2+t;
          ctx.globalAlpha=.4+.6*Math.abs(Math.sin(t*2+i));
          ctx.beginPath();
          ctx.moveTo(cx+Math.cos(a)*18*s, cy-20+Math.sin(a)*18*s);
          ctx.lineTo(cx+Math.cos(a)*54*s, cy-20+Math.sin(a)*54*s);
          ctx.stroke();
        }
        ctx.globalAlpha=1; ctx.shadowBlur=0;
      }
      if (t >= 4 && t < 7) {
        ctx.font='bold 16px monospace'; ctx.fillStyle='#00ff88';
        ctx.shadowBlur=8; ctx.shadowColor='#00ff88';
        const chars='01{}()[]<>=>+-*/#@$%&|!?'.split('');
        for (let i=0;i<3;i++){
          const x = cx - 50 + Math.random()*100;
          const y = cy + 40 + ((t-4)*40 + i*30)%(H-cy);
          ctx.globalAlpha = Math.max(0, 1 - (y-cy)/200);
          ctx.fillText(chars[Math.floor(Math.random()*chars.length)], x, y);
        }
        ctx.globalAlpha=1; ctx.shadowBlur=0;
      }
      if (t >= 6.5 && t < 8) {
        const inten = Math.min((t-6.5)/1.5,1);
        const grad = ctx.createRadialGradient(cx,cy,0,cx,cy,Math.max(W,H)*inten);
        grad.addColorStop(0,`rgba(255,255,255,${inten})`);
        grad.addColorStop(.3,`rgba(0,255,136,${inten*.8})`);
        grad.addColorStop(1,'transparent');
        ctx.fillStyle = grad; ctx.fillRect(0,0,W,H);
      }
      if (t >= 7.5) {
        const f = Math.min((t-7.5)/1.5,1);
        ctx.strokeStyle = `rgba(0,255,136,${.15*f})`;
        for (let x=0;x<W;x+=40){ ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
        for (let x=0;x<W;x+=60){
          const h = 100+Math.sin(x*.01+t)*80+150;
          ctx.strokeStyle = `rgba(0,204,255,${(.3+.4*Math.abs(Math.sin(x*.02+t*.5)))*f})`;
          ctx.lineWidth=1.5; ctx.shadowBlur=6; ctx.shadowColor='#00ccff';
          ctx.strokeRect(x+10,H-h,40,h);
        }
        ctx.shadowBlur=0;
        if (t >= 8) {
          const lf = Math.min((t-8)/1,1);
          ctx.globalAlpha=lf;
          ctx.font='bold 28px system-ui'; ctx.fillStyle='#fff';
          ctx.textAlign='center'; ctx.shadowBlur=20; ctx.shadowColor='#00ff88';
          ctx.fillText('فكرتك لبناء المستقبل', cx, cy+20);
          ctx.font='14px system-ui'; ctx.fillStyle='#00ff88';
          ctx.fillText('pot-awlq', cx, cy+55);
          ctx.font='11px system-ui'; ctx.fillStyle='#666'; ctx.shadowBlur=0;
          ctx.fillText('© @حسين غلاب 2026', cx, H-40);
          ctx.globalAlpha=1;
        }
        if (t > 10.5) { onComplete(); return; }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', resize); };
  }, [onComplete]);
  return (
    <div style={{position:'fixed',inset:0,background:'#000',zIndex:9999}}>
      <canvas ref={canvasRef} style={{display:'block',width:'100%',height:'100%'}} />
      <button onClick={onComplete} style={{
        position:'absolute',bottom:'1.5rem',right:'1.5rem',padding:'.5rem 1rem',
        borderRadius:'.5rem',background:'rgba(255,255,255,.1)',color:'#888',fontSize:'.85rem'
      }}>تخطّي ⏭</button>
    </div>
  );
}
