import { ContactInfo, NavItem } from '../models/nav-item.interface';

/**
 * Global navigation links for the main navbar and footer.
 */
export const DEFAULT_NAV_ITEMS: readonly NavItem[] = [
  { id: 'home', label: 'HOME', path: '/', isActive: true },
  { id: 'about', label: 'ABOUT', path: '/about', isActive: false },
  { id: 'services', label: 'SERVICES', path: '/services', isActive: false },
  { id: 'podcast', label: 'PODCAST', path: '/podcast', isActive: false },
  { id: 'contact', label: 'CONTACT', path: '/contact', isActive: false }
];

/**
 * Company contact details displayed in the footer component.
 */
export const DEFAULT_CONTACT_INFO: Readonly<ContactInfo> = {
  address: '1546 Cole Blvd Bldg 5, Suite 100 Lakewood, CO 80401',
  phone: '(720) 763-9094',
  email: 'info@n-compass.biz'
};
