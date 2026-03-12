export const getAuthOverview = () => ({
  provider: "Supabase Auth",
  mode: "Placeholder SSO profile",
  placeholderNotice: "This API currently returns demo policies and provider metadata only.",
  supportedFlows: ["email-link", "sso", "mfa"],
});

export const getSessionPolicy = () => ({
  sessionDurationMinutes: 480,
  mfa: "recommended",
  ipAllowList: "managed via Supabase and edge controls",
  executiveLaneReauthentication: true,
});
