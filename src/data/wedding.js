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
  // PLACEHOLDER date: ISO string with timezone so the countdown is accurate.
  dateISO: '2027-06-12T16:00:00-04:00',
  // Short stamp used on the envelope and the invitation (like "02.27.27").
  dateStamp: '06.12.27',
  // Long form used in the hero and footer.
  dateLong: 'Saturday, June 12, 2027',
  city: 'Miami, Florida',
};

export const scripture = {
  text: 'Therefore what God has joined together, let no one separate.',
  reference: 'Mark 10:9',
};

export const venue = {
  // PLACEHOLDER venue
  name: 'Ever After Farms Tropical Grove',
  subtitle: 'Barn Venue',
  description:
    'Surrounded by lush tropical greenery and natural beauty, the Tropical Grove is the perfect setting for our special day. We can\u2019t wait to celebrate our love and begin our forever surrounded by the people we love most!',
  // PLACEHOLDER map link
  mapUrl: 'https://maps.google.com/?q=Ever+After+Farms+Tropical+Grove',
};

export const schedule = [
  { time: '3:30 PM', title: 'Guests arrival', icon: 'bouquet' },
  { time: '4:00 PM', title: 'Ceremony', icon: 'rings' },
  { time: '4:45 PM', title: 'Cocktail Hour', icon: 'glasses' },
  { time: '5:45 PM', title: 'Wedding dinner', icon: 'dinner' },
  { time: '10:00 PM', title: 'End of the evening', icon: 'moon' },
];

export const dressCode = {
  intro:
    'We encourage rich, romantic colors and elegant, formal looks that bring our palette to life!',
  gentlemen:
    'A classic black suit is always a great choice, but we encourage you to embrace the wedding color palette with your formal attire as well.',
  ladies:
    'Please refrain from wearing white or ivory, as these colors are reserved for the bride.',
  outro:
    'If you\u2019re unsure about what to wear or whether a color is appropriate, please feel free to reach out to the bride or groom\u2014we\u2019re happy to help!',
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
  // PLACEHOLDER deadline and link
  deadline: 'December 31, 2026',
  url: 'https://www.zola.com/',
};
