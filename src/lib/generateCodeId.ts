export function generateCodeId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let promoCode = '';
  for (let i = 0; i < 6; i++) {
      promoCode += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return promoCode;
}