// utils/authTelemetry.js
// تسجيل أحداث المصادقة بشكل منظم مع مراعاة الخصوصية

const events = [];

export function logAuthEvent(event, details = {}) {
  // لا تسجل أي بيانات حساسة (كلمات مرور أو توكنات)
  const safeDetails = { ...details };
  if (safeDetails.password) delete safeDetails.password;
  if (safeDetails.token) delete safeDetails.token;
  events.push({
    event,
    details: safeDetails,
    timestamp: new Date().toISOString(),
  });
  // يمكن لاحقاً إرسال الأحداث إلى خدمة خارجية (Sentry, LogRocket, إلخ)
  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.log('[AUTH EVENT]', event, safeDetails);
  }
}

export function getAuthEvents() {
  return events;
}
