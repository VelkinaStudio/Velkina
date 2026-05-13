import KonakCoffee from './KonakCoffee';

export const metadata = {
  title: 'Konak Coffee · Roastery & bar',
  description: 'Single-origin coffee, roasted on Monday, brewed by hand. Beyoğlu, Istanbul.',
  alternates: { canonical: '/demo/konak-coffee' }
};

export default function Page() {
  return <KonakCoffee />;
}
