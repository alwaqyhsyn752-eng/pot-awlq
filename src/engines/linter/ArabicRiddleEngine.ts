export class ArabicRiddleEngine {
  private attempts = 0;

  generateHint(code: string, pos: number): { text: string; reveal?: string } {
    this.attempts++;
    const ctx = code.slice(Math.max(0, pos - 25), pos + 25);
    const riddles: Record<string, string> = {
      '(': '🔮 فتحت الباب لكنك نسيت أن تدخل! ما رمز الدخول إلى الدالة؟',
      ')': '🔮 بدأت الحكاية ولم تُنهِها... ما رمز الإغلاق؟',
      ':': '🔮 بايثون تتحدث بلغة الحياتين! أين رمز بداية الكتلة؟',
      '=': '🔮 تريد إخبار الحاسوب بشيء، لكنك نسيت كيف تربطه. ما رمز الإشارة؟',
      '"': '🔮 تريد أن يتكلم الكود، لكن الكلمات محبوسة! ما رمز تحرير النصوص؟',
      "'": '🔮 ابحث عن علامة التنصيص المفردة لتحرير النص.',
      ']': '🔮 فتحت القائمة ولم تغلقها... ما رمز الإغلاق؟',
      '}': '🔮 الكتلة مفتوحة! ما رمز إغلاقها؟',
    };
    if (this.attempts <= 2) {
      const found = Object.entries(riddles).find(([s]) => !ctx.includes(s));
      return { text: found ? found[1] : '🔮 توقف قليلاً... ابحث عن الرمز الناقص بعناية، أنت قريب!' };
    }
    const missing = this.detect(ctx);
    if (missing) return { text: `💡 حسناً، الرمز الناقص هو: "${missing}". ضعه في موقعه الصحيح.`, reveal: missing };
    return { text: '💡 راجع السطر مرة أخرى، الرمز الناقص قريب جداً من موقع المؤشر.' };
  }

  private detect(ctx: string): string | null {
    const pairs: [string, string][] = [['(', ')'], ['[', ']'], ['{', '}']];
    for (const [o, c] of pairs) {
      const co = (ctx.match(new RegExp('\\' + o, 'g')) || []).length;
      const cc = (ctx.match(new RegExp('\\' + c, 'g')) || []).length;
      if (co > cc) return c;
    }
    return null;
  }
  reset() { this.attempts = 0; }
}
