import { Component, signal, WritableSignal, Output, EventEmitter, ElementRef, HostListener, OnDestroy } from '@angular/core';

import { GlassIconComponent } from '../../shared/components/glass-icon/glass-icon.component';
import { CommonModule } from '@angular/common';
import { SocialPlatform } from '../../shared/models/nav-item.interface';
import { Modal, Input as NtvInput } from '@ntv360/component-pantry';

/**
 * FooterSectionComponent — Complete Footer section featuring CTA banner and slide-up dark footer drawer.
 */
@Component({
  selector: 'app-footer-section',
  standalone: true,
  imports: [CommonModule, GlassIconComponent, Modal, NtvInput],
  templateUrl: './footer-section.html',
  styleUrl: './footer-section.scss',
})
export class FooterSectionComponent implements OnDestroy {
  /** Emits when "Get In Touch" button is clicked */
  @Output() getInTouchClick = new EventEmitter<void>();

  /** Emits when social icon is clicked */
  @Output() socialClick = new EventEmitter<SocialPlatform>();

  /** Signal controlling whether the dark footer drawer has slid up into view */
  public readonly isSlidUp: WritableSignal<boolean> = signal<boolean>(false);

  /** Controls visibility of the contact modal */
  public readonly isContactModalOpen: WritableSignal<boolean> = signal<boolean>(false);

  public readonly currentYear: number = new Date().getFullYear();

  private scrollRAF: number | null = null;

  constructor(private el: ElementRef) {}

  /**
   * Fires on every window scroll event (throttled via requestAnimationFrame).
   * Activates footer drawer when the user has scrolled into the footer zone,
   * reverses when the user scrolls back up.
   */
  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (this.scrollRAF !== null) return;
    this.scrollRAF = requestAnimationFrame(() => {
      this.scrollRAF = null;
      const scrollBottom = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const footerHeight = this.el.nativeElement.offsetHeight || 0;

      // Reveal when scroll bottom is within the footer's reveal zone
      const threshold = Math.max(footerHeight * 0.9, 80);
      const shouldReveal = scrollBottom >= docHeight - footerHeight + threshold;

      if (shouldReveal !== this.isSlidUp()) {
        this.isSlidUp.set(shouldReveal);
      }
    });
  }

  public ngOnDestroy(): void {
    if (this.scrollRAF !== null) {
      cancelAnimationFrame(this.scrollRAF);
    }
  }

  /**
   * Manually toggles slide-up footer state for demonstration.
   */
  public toggleSlide(): void {
    this.isSlidUp.update((state) => !state);
  }

  public handleGetInTouch(): void {
    this.isContactModalOpen.set(true);
    this.getInTouchClick.emit();
  }

  public closeContactModal(): void {
    this.isContactModalOpen.set(false);
  }

  public submitForm(): void {
    // TODO: wire up form submission logic
    this.isContactModalOpen.set(false);
  }

  public handleSocialClick(platform: SocialPlatform): void {
  const socialLinks: Record<SocialPlatform, string> = {
    linkedin: 'https://www.linkedin.com/company/n-compass-tv/', // replace with actual URL
    facebook: 'https://www.facebook.com/ncompass.tv/',            // replace with actual URL
    instagram: 'https://www.instagram.com/ncompasstv/',         // replace with actual URL
  };

  const url = socialLinks[platform];

  if (url) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  this.socialClick.emit(platform);
}
}
