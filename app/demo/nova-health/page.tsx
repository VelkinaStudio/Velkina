import NovaHealth from './NovaHealth';

export const metadata = {
  title: 'Nova Health — Doctor-first healthcare in Istanbul',
  description: 'Browse our physicians, not abstract specialties. Three clinics, one record. Same-day intake for general medicine.',
  alternates: { canonical: '/demo/nova-health' }
};

export default function Page() {
  return <NovaHealth />;
}
