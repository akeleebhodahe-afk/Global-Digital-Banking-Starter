export const knowledge = [
  {
    slug: 'moving-money-internationally',
    title: 'Moving money internationally',
    excerpt: 'What to consider when currencies, fees, timing, and local rules meet.',
    status: 'PUBLISHED'
  },
  {
    slug: 'language-of-banking',
    title: 'The language of banking',
    excerpt: 'A plain-language glossary for the terms that shape financial choices.',
    status: 'PUBLISHED'
  },
  {
    slug: 'planning-across-borders',
    title: 'Planning across borders',
    excerpt: 'Practical starting points for building confidence wherever life takes you.',
    status: 'PUBLISHED'
  }
];

export const resources = [
  { slug: 'international-banking-guide', type: 'GUIDE', title: 'International banking, explained', description: 'A practical starting point for global financial decisions.', href: '/knowledge', status: 'PUBLISHED' },
  { slug: 'global-time-zone-dashboard', type: 'TOOL', title: 'Global time-zone dashboard', description: 'Keep important locations visible while planning your next move.', href: '/dashboard', status: 'PUBLISHED' },
  { slug: 'contact-support', type: 'SUPPORT', title: 'Questions before you begin?', description: 'Share a product or experience question with the team.', href: '/contact', status: 'PUBLISHED' }
];

export const membershipPlans = [
  { code: 'ESSENTIAL', name: 'Foundation', description: 'Simple tools and knowledge for getting oriented.', priceDisplay: 'Free', features: ['Global knowledge library', 'Essential resources', 'Dashboard preview'], status: 'PREVIEW' },
  { code: 'CONNECTED', name: 'Connected', description: 'A more complete view for a life that crosses borders.', priceDisplay: 'Coming soon', features: ['Personalized insights', 'Expanded global tools', 'Priority support experience'], status: 'PREVIEW' }
];

// Demo-only projections. These are not authenticated or connected to financial data.
export const demoProfile = {
  id: 'demo-profile',
  displayName: 'Demo member',
  email: 'demo@example.invalid',
  locale: 'en-US',
  preferredCurrency: 'USD',
  status: 'PROTOTYPE_ONLY'
};

export const demoAccounts = [
  {
    id: 'demo-account-usd',
    name: 'USD checking',
    currency: 'USD',
    maskedNumber: '•••• 2048',
    balanceDisplay: '$24,850.72',
    status: 'PREVIEW'
  },
  {
    id: 'demo-account-eur',
    name: 'EUR savings',
    currency: 'EUR',
    maskedNumber: '•••• 7710',
    balanceDisplay: '€5,980.40',
    status: 'PREVIEW'
  }
];

export const demoTransfers = [
  {
    id: 'demo-transfer-001',
    sourceAccountId: 'demo-account-usd',
    beneficiaryLabel: 'Maya Chen · Singapore',
    sourceAmountDisplay: '$850.00',
    destinationAmountDisplay: 'S$1,142.00',
    feeDisplay: '$4.50',
    status: 'PREVIEW_ONLY',
    createdAt: '2026-09-23T10:30:00Z'
  }
];
