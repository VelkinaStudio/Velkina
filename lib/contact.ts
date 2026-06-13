export const CONTACT = {
  email: 'info@velkina.com',
  phoneDisplay: '+90 532 336 00 51',
  phoneE164: '+905323360051',
  whatsappDigits: '905323360051',
  scheduleUrl: 'https://cal.com/velkina',
} as const;

export const telHref = `tel:${CONTACT.phoneE164}`;

export const mailHref = (subject?: string): string =>
  `mailto:${CONTACT.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;

export const whatsappHref = (prefill?: string): string =>
  `https://wa.me/${CONTACT.whatsappDigits}${prefill ? `?text=${encodeURIComponent(prefill)}` : ''}`;
