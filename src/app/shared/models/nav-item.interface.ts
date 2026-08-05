/**
 * Navigation item payload definition.
 */
export interface NavItem {
  id: string;
  label: string;
  path: string;
  isActive?: boolean;
}

/**
 * Union type for supported social media platforms.
 */
export type SocialPlatform = 'linkedin' | 'facebook' | 'instagram';

/**
 * Contact detail payload definition.
 */
export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
}
