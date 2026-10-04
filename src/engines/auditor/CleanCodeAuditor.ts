export interface AuditCheck { nameAr: string; passed: boolean; weight: number; detail: string; }
export interface AuditResult { score: number; grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F'; checks: AuditCheck[]; suggestions: string[]; }

export class CleanCodeAuditor {
  audit(code: string, lang: 'python' | 'javascript'): AuditResult {
    const lines = code.split('\n');
    const checks: AuditCheck[] = [];

    const longFns = this.findLongFunctions(code, lang);
    checks.push({ nameAr: 'طول الدوال', passed: longFns.length === 0, weight: 15,
      detail: longFns.length ? `${longFns.length} دالة طويلة (>30 سطر)` : 'جميع الدوال بطول مناسب' });

    const dups = this.findDuplicates(lines);
    checks.push({ nameAr: 'تكرار الكود', passed: dups === 0, weight: 15,
      detail: dups ? `${dups} سطر مكرر` : 'لا يوجد تكرار' });

    const bad = this.checkNaming(code, lang);
    checks.push({ nameAr: 'تسمية المتغيرات', passed: bad.length === 0, weight: 20,
      detail: bad.length ? `أسماء غير واضحة: ${bad.slice(0, 3).join(', ')}` : 'أسماء واضحة' });

    const ratio = this.commentRatio(lines, lang);
    checks.push({ nameAr: 'التعليقات', passed: ratio >= 0.05 && ratio <= 0.5, weight: 15,
      detail: ratio < 0.05 ? 'يحتاج تعليقات' : ratio > 0.5 ? 'تعليقات كثيرة' : 'نسبة جيدة' });

    const hasErr = this.hasErrorHandling(code, lang);
    checks.push({ nameAr: 'معالجة الأخطاء', passed: hasErr, weight: 20,
      detail: hasErr ? 'يوجد try/except' : 'أضف معالجة للأخطاء' });

    checks.push({ nameAr: 'طول الملف', passed: lines.length <= 300, weight: 15,
      detail: lines.length > 300 ? `${lines.length} سطر` : `${lines.length} سطر` });

    const total = checks.reduce((s, c) => s + c.weight, 0);
    const earned = checks.reduce((s, c) => s + (c.passed ? c.weight : 0), 0);
    const score = Math.round((earned / total) * 100);

    const suggestions = checks.filter(c => !c.passed).map(c => `🔧 ${c.nameAr}: ${c.detail}`);
    return { score, grade: this.toGrade(score), checks, suggestions };
  }

  private toGrade(s: number): AuditResult['grade'] {
    if (s >= 95) return 'A+'; if (s >= 85) return 'A'; if (s >= 75) return 'B';
    if (s >= 65) return 'C'; if (s >= 50) return 'D'; return 'F';
  }
  private findLongFunctions(code: string, lang: string): string[] {
    const lines = code.split('\n');
    const out: string[] = [];
    let cur: string | null = null, len = 0;
    const re = lang === 'python' ? /^def\s+(\w+)/ : /function\s+(\w+)/;
    for (const line of lines) {
      const m = line.match(re);
      if (m) { if (cur && len > 30) out.push(cur); cur = m[1]; len = 0; }
      len++;
    }
    if (cur && len > 30) out.push(cur);
    return out;
  }
  private findDuplicates(lines: string[]): number {
    const seen = new Map<string, number>();
    let d = 0;
    for (const l of lines) {
      const t = l.trim();
      if (!t || t.startsWith('#') || t.startsWith('//') || t.length < 6) continue;
      const n = t.replace(/\s+/g, ' ');
      const c = (seen.get(n) || 0) + 1;
      seen.set(n, c);
      if (c === 2) d++;
    }
    return d;
  }
  private checkNaming(code: string, lang: string): string[] {
    const bad: string[] = [];
    const re = lang === 'python' ? /\b([a-zA-Z_]\w*)\s*=/g : /\b(?:let|const|var)\s+([a-zA-Z_]\w*)/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(code)) !== null) {
      if (m[1].length === 1 && !'ijkxyn'.includes(m[1])) bad.push(m[1]);
    }
    return bad;
  }
  private commentRatio(lines: string[], lang: string): number {
    const marker = lang === 'python' ? '#' : '//';
    const c = lines.filter(l => l.trim().startsWith(marker)).length;
    const code = lines.filter(l => l.trim() && !l.trim().startsWith(marker)).length;
    return code === 0 ? 0 : c / code;
  }
  private hasErrorHandling(code: string, lang: string): boolean {
    return lang === 'python' ? /try\s*:/.test(code) && /except/.test(code)
                            : /try\s*\{/.test(code) && /catch/.test(code);
  }
}
