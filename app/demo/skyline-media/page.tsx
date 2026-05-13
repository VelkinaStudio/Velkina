import DemoSite from '../DemoSite';

export const metadata = {
  title: 'Skyline Media — Independent journalism, Istanbul',
  description: 'Long-form journalism, podcasts and field reporting from Istanbul. Listen, read, subscribe.',
  alternates: { canonical: '/demo/skyline-media' }
};

export default function Page() {
  return (
    <DemoSite
      brand="Skyline Media"
      brandMark="SM"
      caption="Independent · Reader-funded · Istanbul"
      headlineLead="Journalism,"
      headlineItalic="without the noise."
      intro="Long-form reporting, a weekly podcast, and field dispatches from across the country. Reader-funded, ad-free, no algorithm in the loop. Read on the web, listen on any podcast app, subscribe by email."
      primaryCta="Subscribe"
      secondaryCta="Browse the shows"
      sectionsEyebrow="What we publish"
      sectionsHeadingLead="Stories,"
      sectionsHeadingItalic="three ways."
      sections={[
        { title: 'The Weekly · podcast', sub: 'One long interview, every Friday. 90 min.', tag: 'Podcast' },
        { title: 'On the Ground · dispatches', sub: 'Short reports from the road. Twice a week.', tag: 'Field' },
        { title: 'Long Reads', sub: 'One narrative feature a month. Photography included.', tag: 'Feature' },
        { title: 'Q&A · interviews', sub: 'Edited transcripts. People you should know.', tag: 'Interview' },
        { title: 'Sunday Briefing', sub: 'A short email with what we read this week.', tag: 'Email' },
        { title: 'Archive', sub: 'Five years of work, fully searchable.', tag: 'Archive' }
      ]}
      statsHeading="Reader-funded. No advertising."
      stats={[
        { label: 'Active readers', value: '38k' },
        { label: 'Paid subscribers', value: '4,200' },
        { label: 'Episodes', value: '212' },
        { label: 'Average listen', value: '54 min' }
      ]}
      footerLine="© Skyline Media · Istanbul"
      caseSlug="skyline-media-mobile-app"
      palette={{
        bg: '#0B0B0E',
        surface: '#15151A',
        text: '#F4F1EB',
        muted: '#8D8884',
        border: '#F4F1EB18',
        accent: '#E07A3A',
        accentText: '#0B0B0E'
      }}
    />
  );
}
