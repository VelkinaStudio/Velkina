import MarmaraFoods from './MarmaraFoods';

export const metadata = {
  title: 'Marmara Foods · Cold-pressed olive oil',
  description: 'A family mill outside Tekirdağ since 1978. Cold-pressed olive oil, tarhana, mantı.',
  alternates: { canonical: '/demo/marmara-foods' }
};

export default function Page() {
  return <MarmaraFoods />;
}
