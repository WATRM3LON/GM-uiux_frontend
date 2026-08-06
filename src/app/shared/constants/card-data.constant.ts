import { FeatureCardData } from '../models/feature-card.interface';
import { TestimonialData } from '../models/testimonial.interface';

/**
 * Default feature card payload using official webdev image asset from public folder.
 */
export const DEFAULT_FEATURE_CARD_DATA: Readonly<FeatureCardData> = {
  id: 'website-dev',
  badgeText: 'FOUNDATIONAL',
  badgeType: 'foundational',
  title: 'Website Development',
  description:
    "A modern website is critical for developing Local SEO and your customer's brand with detailed and engaging content...",
  buttonText: 'Learn More',
  buttonUrl: '/services/website-development',
  backgroundImageUrl: 'assets/images/webdev.png'
};

/**
 * Additional feature cards using available public image assets.
 */
export const ALL_FEATURE_CARDS_DATA: readonly FeatureCardData[] = [
  DEFAULT_FEATURE_CARD_DATA,
  {
    id: 'social-media-ads',
    badgeText: 'LEAD GEN',
    badgeType: 'lead-gen',
    title: 'Social Media Ads',
    description:
      'Targeted social media advertising campaigns designed to maximize engagement and ROI across platforms.',
    buttonText: 'Learn More',
    buttonUrl: '/services/social-media-ads',
    backgroundImageUrl: 'assets/images/socialmediaads.png'
  },
  {
    id: 'display-ads',
    badgeText: 'BRANDING',
    badgeType: 'branding',
    title: 'Display Ads',
    description:
      'Eye-catching digital display ads broadcasted across local community venues and digital billboards.',
    buttonText: 'Learn More',
    buttonUrl: '/services/display-ads',
    backgroundImageUrl: 'assets/images/displayads.png'
  }
];

/**
 * Default testimonial card payload using official testimonial image asset from public folder.
 */
export const DEFAULT_TESTIMONIAL_DATA: Readonly<TestimonialData> = {
  id: 'jessey-kirk-testimonial',
  quoteText:
    'The most important part of the Startup Framework is the samples. The samples form a set of 25 usable pages you can use as is or you can add new blocks from UI Kit.',
  authorName: 'JESSEY KIRK',
  authorTitle: 'DESIGNMODO',
  authorAvatarUrl: 'assets/images/testimonial1.png'
};

/**
 * Additional testimonial data using second public testimonial asset.
 */
export const SECOND_TESTIMONIAL_DATA: Readonly<TestimonialData> = {
  id: 'sarah-jenkins-testimonial',
  quoteText:
    'N-Compass TV has transformed our local business presence. The indoor billboard placement gave us incredible visibility in our community!',
  authorName: 'SARAH JENKINS',
  authorTitle: 'MARKETING DIRECTOR',
  authorAvatarUrl: 'assets/images/testimonial2.png'
};
