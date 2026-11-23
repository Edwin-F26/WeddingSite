/**
 * Single source of truth for all site copy.
 * Edit this file to update names, dates, venue, schedule, and links.
 *
 * TODO: Entries marked PLACEHOLDER were not provided and should be replaced.
 */

export const couple = {
  first: 'Edwin',
  second: 'Maria',
};

export const event = {
  // Miami is on EDT (UTC-4) on September 30.
  dateISO: '2027-09-30T16:00:00-04:00',
  // Short stamp used on the envelope and the invitation (like "02.27.27").
  dateStamp: '09.30.27',
  // Long form used in the hero and footer.
  dateLong: 'Thursday, September 30, 2027',
  city: 'Miami, Florida',
};

export const scripture = {
  text:
    'Love bears all things, believes all things, hopes all things, endures all things. Love never ends.',
  reference: '1 Corinthians 13:7\u20138',
};

export const venue = {
  name: 'Loveland Venue',
  subtitle: 'A Private Tropical Estate',
  address: '18905 SW 168th Street, Miami, FL 33187',
  description:
    'A private wedding estate where lush tropical gardens meet timeless celebrations. From our ceremony to the last dance, every moment of the evening will unfold together in one beautiful setting.',
  websiteUrl: 'https://www.lovelandvenue.com/',
  mapUrl:
    'https://www.google.com/maps/search/?api=1&query=Loveland+Venue+18905+SW+168th+Street+Miami+FL+33187',
};

export const schedule = [
  { time: '3:30 PM', title: 'Guests arrival', icon: 'bouquet' },
  { time: '4:00 PM', title: 'Ceremony', icon: 'rings' },
  { time: '4:45 PM', title: 'Cocktail Hour', icon: 'glasses' },
  { time: '5:45 PM', title: 'Wedding dinner', icon: 'dinner' },
  { time: '10:00 PM', title: 'End of the evening', icon: 'moon' },
];

export const dressCode = {
  intro: 'Think: one step above cocktail.',
  women: [
    'Floor-length gown or elegant midi/maxi dress',
    'Sophisticated accessories',
  ],
  men: ['Dark suit', 'Dress shirt', 'Tie required'],
  avoid: [
    'Casual fabrics',
    'Open-toe shoes',
    'Loafers without socks (unless exceptionally stylish)',
  ],
  note: 'Please refrain from wearing white or ivory, as these colors are reserved for the bride.',
  // Suggested attire palette, taken from the brand color scheme.
  palette: [
    { name: 'Blush', hex: '#ECACB1' },
    { name: 'Wine', hex: '#471225' },
    { name: 'Cocoa', hex: '#250F0D' },
    { name: 'Sage', hex: '#A8B17E' },
    { name: 'Olive', hex: '#445427' },
    { name: 'Forest', hex: '#161D0A' },
    { name: 'Black', hex: '#000000' },
  ],
};

export const rsvp = {
  // PLACEHOLDER: confirm this deadline with the couple.
  deadline: 'August 30, 2027',
  url: 'https://www.zola.com/',
};
