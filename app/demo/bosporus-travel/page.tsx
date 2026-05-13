import DemoSite from '../DemoSite';

export const metadata = {
  title: 'Bosporus Travel — Custom Istanbul trips',
  description: 'Privately guided Bosphorus tours, day trips and yacht charters. Small groups, local guides.',
  alternates: { canonical: '/demo/bosporus-travel' }
};

export default function Page() {
  return (
    <DemoSite
      brand="Bosporus Travel"
      brandMark="BT"
      caption="Privately guided · since 2014 · Istanbul"
      headlineLead="Istanbul,"
      headlineItalic="the way a local sees it."
      intro="Privately guided day trips, multi-day itineraries, and yacht charters along the Bosphorus. Small groups, English-speaking guides who actually live in the city, vehicles and boats we operate ourselves. We book the table at the place locals go."
      primaryCta="Plan a trip"
      secondaryCta="Browse itineraries"
      sectionsEyebrow="Tours"
      sectionsHeadingLead="Where we"
      sectionsHeadingItalic="take you."
      sections={[
        { title: 'Old Peninsula day', sub: 'Sultanahmet on foot, with the back streets locals use.', tag: '1 day' },
        { title: 'Bosphorus by boat', sub: 'A private boat, four hours, two stops, dinner.', tag: 'Half day' },
        { title: 'The Asian side', sub: 'Kadıköy markets, Üsküdar sunset, ferry back.', tag: '1 day' },
        { title: 'Three-day Istanbul', sub: 'Mosques, neighbourhoods, a hammam, a roof dinner.', tag: '3 days' },
        { title: 'Cappadocia overnight', sub: 'Flight, two nights in a cave hotel, balloon ride.', tag: '3 days' },
        { title: 'Yacht charter', sub: 'Private yacht, your route, our captain.', tag: 'Hourly' }
      ]}
      statsHeading="Guided by people who live here."
      stats={[
        { label: 'Reviews', value: '4.93★' },
        { label: 'Years', value: '11' },
        { label: 'Languages', value: '5' },
        { label: 'Trips / year', value: '1,800' }
      ]}
      footerLine="© Bosporus Travel · Istanbul"
      caseSlug="bosporus-travel-ai-agent"
      palette={{
        bg: '#FDFDFA',
        surface: '#F2EFE6',
        text: '#1F2937',
        muted: '#6B6F76',
        border: '#1F293720',
        accent: '#0F5F8A',
        accentText: '#FDFDFA'
      }}
    />
  );
}
