/**
 * Feature card component payload definition.
 */
export interface FeatureCardData {
  id: string;
  badgeText: string;
  badgeType?: 'branding' | 'lead-gen' | 'foundational' | string;
  title: string;
  description: string;
  buttonText: string;
  buttonUrl?: string;
  backgroundImageUrl: string;
}

