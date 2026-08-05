import { Component, input, OutputEmitterRef, output } from '@angular/core';

import { GlassIconComponent } from '../glass-icon/glass-icon.component';
import { ContactInfo, NavItem, SocialPlatform } from '../../models/nav-item.interface';
import { DEFAULT_CONTACT_INFO, DEFAULT_NAV_ITEMS } from '../../constants/navigation.constant';

/**
 * Main application footer component featuring dark slate styling, bio, glass social icons, quick links, and contact details.
 */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [GlassIconComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  // --- I/O ---
  public readonly navItems = input<readonly NavItem[]>(DEFAULT_NAV_ITEMS);
  public readonly contactInfo = input<ContactInfo>(DEFAULT_CONTACT_INFO);
  public readonly currentYear = input<number>(new Date().getFullYear());

  public readonly linkClick: OutputEmitterRef<NavItem> = output<NavItem>();
  public readonly socialClick: OutputEmitterRef<SocialPlatform> = output<SocialPlatform>();

  // --- Public Methods ---
  /**
   * Handles navigation item clicks within footer lists.
   * @param item Target navigation item
   * @returns void
   */
  public handleLinkClick(item: NavItem): void {
    this.linkClick.emit(item);
  }

  /**
   * Handles social media glass button triggers.
   * @param platform Social platform identifier
   * @returns void
   */
  public handleSocialClick(platform: SocialPlatform): void {
    this.socialClick.emit(platform);
  }

  /**
   * Tracks nav items by ID.
   * @param index Array index
   * @param item NavItem payload
   * @returns Unique item ID
   */
  public trackByItemId(index: number, item: NavItem): string {
    return item.id;
  }
}
