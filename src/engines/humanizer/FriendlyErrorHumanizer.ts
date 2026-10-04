export class FriendlyErrorHumanizer {
  private rules: { p: RegExp; e: (m: RegExpMatchArray) => string }[] = [
    { p: /NameError:\s*name '(\w+)'/, e: (m) => `⚠️ لم أتعرف على "${m[1]}".\n✅ تأكد من تعريف المتغير قبل استخدامه.` },
    { p: /SyntaxError/, e: () => `⚠️ خطأ في تركيب الجملة.\n✅ راجع الأقواس ( ) والفواصل والمسافات البادئة.` },
    { p: /IndentationError/, e: () => `⚠️ المسافة البادئة غير صحيحة.\n✅ استخدم 4 مسافات لكل مستوى، لا تخلط Tab و Space.` },
    { p: /TypeError/, e: () => `⚠️ نوع البيانات غير متوافق.\n✅ استخدم str() أو int() للتحويل بين الأنواع.` },
    { p: /ZeroDivisionError/, e: () => `⚠️ قسمة على صفر!\n✅ تحقق من المقام قبل القسمة.` },
    { p: /IndexError/, e: () => `⚠️ فهرس خارج النطاق.\n✅ تذكر أن الفهرسة تبدأ من 0، وتحقق من الطول بـ len().` },
    { p: /is not defined/, e: (m) => `⚠️ المتغير غير معرّف.\n✅ عرّفه قبل استخدامه.` },
    { p: /Unexpected token/, e: () => `⚠️ رمز غير متوقع.\n✅ تحقق من الأقواس والفاصلة المنقوطة.` },
  ];

  humanize(error: Error | string): string {
    const msg = typeof error === 'string' ? error : error.message;
    for (const { p, e } of this.rules) {
      const m = msg.match(p);
      if (m) return e(m);
    }
    return `⚠️ خطأ غير متوقع: ${msg}\n✅ راجع الكود سطراً بسطر.`;
  }
}
