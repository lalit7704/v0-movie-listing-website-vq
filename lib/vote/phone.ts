/** Indian mobile numbers only: returns +91XXXXXXXXXX, or null if the input is not one. */
export function normalizePhone(input: string) {
  let digits = input.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return /^[6-9]\d{9}$/.test(digits) ? `+91${digits}` : null;
}

/** +91 98765 43210 */
export function formatPhone(phone: string) {
  const digits = phone.replace(/^\+91/, "");
  return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
}

/** +91 98xxx xx210, for messages that should not show the full number. */
export function maskPhone(phone: string) {
  const digits = phone.replace(/^\+91/, "");
  return `+91 ${digits.slice(0, 2)}xxx xx${digits.slice(7)}`;
}
