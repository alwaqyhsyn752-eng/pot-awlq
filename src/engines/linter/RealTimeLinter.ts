export interface LintError { pos: number; len: number; message: string; severity: 'error' | 'warning'; }
export interface LintRule { pattern: RegExp; message: string; hint: string; severity: 'error' | 'warning'; }

const PY_RULES: LintRule[] = [
  { pattern: /print\s+[^(]/g, message: 'print() يحتاج أقواساً', hint: 'استخدم print("نصك")', severity: 'error' },
  { pattern: /=\s*$/gm, message: 'إسناد بدون قيمة', hint: 'أضف قيمة بعد =', severity: 'warning' },
  { pattern: /[（）：，]/g, message: 'رمز غير إنجليزي', hint: 'استخدم الأقواس الإنجليزية', severity: 'error' },
];

const JS_RULES: LintRule[] = [
  { pattern: /=\s*$/gm, message: 'إسناد بدون قيمة', hint: 'أضف قيمة بعد =', severity: 'warning' },
  { pattern: /[（）：，]/g, message: 'رمز غير إنجليزي', hint: 'استخدم الأقواس الإنجليزية', severity: 'error' },
];

export class RealTimeLinter {
  lint(code: string, lang: 'python' | 'javascript'): LintError[] {
    const rules = lang === 'python' ? PY_RULES : JS_RULES;
    const errors: LintError[] = [];
    for (const rule of rules) {
      const re = new RegExp(rule.pattern.source, rule.pattern.flags);
      let m: RegExpExecArray | null;
      while ((m = re.exec(code)) !== null) {
        errors.push({ pos: m.index, len: m[0].length, message: rule.message, severity: rule.severity });
      }
    }
    return errors;
  }
}
