import Link from 'next/link';
import LaviniaMenu from './LaviniaMenu';

export const metadata = {
  title: 'Lavinia Bistro · Menu',
  description: 'A modern Romanian bistro in Bucharest. Browse the menu, order at your table.',
  alternates: { canonical: '/demo/lavinia-bistro' }
};

export default function LaviniaBistroPage() {
  return <LaviniaMenu />;
}
