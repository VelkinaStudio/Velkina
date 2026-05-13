import DemoSite from '../DemoSite';

export const metadata = {
  title: 'Marmara Foods — Olive oils & specialty foods',
  description: 'A family-run food brand from the Marmara region. Olive oil, tarhana, mantı — pressed and milled by hand.',
  alternates: { canonical: '/demo/marmara-foods' }
};

export default function Page() {
  return (
    <DemoSite
      brand="Marmara Foods"
      brandMark="M"
      caption="Family-run · since 1978 · Tekirdağ"
      headlineLead="Pressed by hand,"
      headlineItalic="bottled the same day."
      intro="Cold-pressed olive oil, slow-fermented tarhana, hand-folded mantı — produced in our family mill outside Tekirdağ since 1978. Distributed across Türkiye and shipped to Europe in temperature-controlled cases."
      primaryCta="Order wholesale"
      secondaryCta="See the range"
      sectionsEyebrow="The range"
      sectionsHeadingLead="What we make,"
      sectionsHeadingItalic="and how."
      sections={[
        { title: 'Early-harvest olive oil', sub: 'Pressed within 4 hours of picking. 0.2% acidity, single-variety.', tag: 'Cold-pressed' },
        { title: 'Aged olive oil', sub: 'Six months in stainless. Rounder, mellower, deeper.', tag: 'Aged' },
        { title: 'Tarhana', sub: 'Yogurt, peppers, dried in the sun on linen.', tag: 'Slow' },
        { title: 'Frozen mantı', sub: 'Folded by hand, fifty pieces per box.', tag: 'Hand-folded' },
        { title: 'Pekmez', sub: 'Grape molasses, two kinds. Dark and pale.', tag: 'Boiled' },
        { title: 'Wild thyme honey', sub: 'Sourced from one bee-keeper in the Şarköy hills.', tag: 'Single-origin' }
      ]}
      statsHeading="Four generations, one mill."
      stats={[
        { label: 'Founded', value: '1978' },
        { label: 'Trees', value: '12,400' },
        { label: 'Bottles / year', value: '180k' },
        { label: 'Export markets', value: '11' }
      ]}
      footerLine="© Marmara Foods · Tekirdağ"
      caseSlug="marmara-foods-google-ads"
      palette={{
        bg: '#F8F4EC',
        surface: '#EFE7D6',
        text: '#2A2418',
        muted: '#73685A',
        border: '#2A241820',
        accent: '#5C7A2D',
        accentText: '#F8F4EC'
      }}
    />
  );
}
