import { Component, input, OutputEmitterRef, output, signal, WritableSignal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavItem } from '../../models/nav-item.interface';
import { DEFAULT_NAV_ITEMS } from '../../constants/navigation.constant';

/**
 * Top application navigation header component featuring brand logo, pill menu, and phone action trigger.
 * Supports sticky layout, smooth section scrolling, and dynamic logo switching (white for dark sections, black for light sections).
 */
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  // --- Inputs ---
  public readonly navItems = input<readonly NavItem[]>(DEFAULT_NAV_ITEMS);

  /** Currently active section ID passed from parent app component scroll observer */
  public readonly activeSection = input<string>('hero');

  // --- Outputs ---
  public readonly navSelect: OutputEmitterRef<NavItem> = output<NavItem>();
  public readonly callClick: OutputEmitterRef<void> = output<void>();

  // --- Signals ---
  public readonly isMobileMenuOpen: WritableSignal<boolean> = signal<boolean>(false);

  /** Computed logo URL based on current active section (white logo for dark sections, black for light sections) */
  public readonly logoSrc = computed<string>(() => {
    const currentSection = this.activeSection().toLowerCase();
    // Dark sections: hero, home, about, podcast, footer, contact
    // Light sections: services, testimonials
    const isLightSection = currentSection === 'services' || currentSection === 'testimonials';
    return isLightSection ? 'assets/NCTV-C_LOGO-black.svg' : 'assets/NCTV-C_LOGO-white.svg';
  });

  /** Computed active item ID for navigation highlight */
  public readonly activeItemId = computed<string>(() => {
    const current = this.activeSection().toLowerCase();
    if (current === 'hero') return 'home';
    if (current === 'footer') return 'contact';
    return current;
  });

  // --- Public Methods ---
  public toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((isOpen: boolean): boolean => !isOpen);
  }

  /**
   * Handles selection of a navigation item with smooth scrolling to target section.
   * @param item Selected navigation item payload
   * @param event DOM click event
   */
  public handleNavSelect(item: NavItem, event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.isMobileMenuOpen.set(false);

    // Map nav item ID to section DOM ID
    let targetId = item.id;
    if (item.id === 'home') targetId = 'hero';
    if (item.id === 'contact') targetId = 'footer';

    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    this.navSelect.emit(item);
  }

  public handleCallClick(): void {
    this.callClick.emit();
  }

  public trackByItemId(index: number, item: NavItem): string {
    return item.id;
  }
}
