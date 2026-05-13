import DemoSite from '../DemoSite';

export const metadata = {
  title: 'Anatolia Hotel — Cave hotel in Cappadocia',
  description: 'A small cave hotel in Uçhisar. Twelve rooms carved into the rock. Book directly.',
  alternates: { canonical: '/demo/anatolia-hotel' }
};

export default function Page() {
  return (
    <DemoSite
      brand="Anatolia Hotel"
      brandMark="AH"
      caption="Cave hotel · Uçhisar · Cappadocia"
      headlineLead="Twelve rooms,"
      headlineItalic="carved into the rock."
      intro="A family-run cave hotel in Uçhisar village. Twelve rooms, each different, all looking out at Pigeon Valley. Breakfast on the terrace at sunrise — the same minute the balloons go up. Book directly with us; you'll pay 20% less than the OTAs."
      primaryCta="Book direct"
      secondaryCta="See the rooms"
      sectionsEyebrow="The hotel"
      sectionsHeadingLead="What's"
      sectionsHeadingItalic="in the rock."
      sections={[
        { title: 'Standard cave room', sub: 'King bed, hand-cut stone bath, valley view.', tag: 'from €110' },
        { title: 'Suite — The Arch', sub: 'Living room, balcony, private terrace.', tag: 'from €190' },
        { title: 'Suite — The Chimney', sub: 'Tower room. Three storeys, two terraces.', tag: 'from €240' },
        { title: 'Family room', sub: 'Two connecting caves. Sleeps four.', tag: 'from €160' },
        { title: 'Terrace breakfast', sub: 'Included. Sunrise. Balloons overhead.', tag: 'Daily' },
        { title: 'Hot-air balloon · partner', sub: 'We book the slot for you the night before.', tag: 'On request' }
      ]}
      statsHeading="Direct booking saves you 20%."
      stats={[
        { label: 'Rooms', value: '12' },
        { label: 'Reviews', value: '9.5/10' },
        { label: 'OTA saving', value: '20%' },
        { label: 'Years open', value: '8' }
      ]}
      footerLine="© Anatolia Hotel · Uçhisar"
      caseSlug="anatolia-hotel-booking"
      palette={{
        bg: '#F4EDE0',
        surface: '#E8DEC8',
        text: '#3A2E1F',
        muted: '#7B6E58',
        border: '#3A2E1F20',
        accent: '#8B4513',
        accentText: '#F4EDE0'
      }}
    />
  );
}
