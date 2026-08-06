import { Component, signal, WritableSignal, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { SocialPlatform } from './shared/models/nav-item.interface';
import { HeroComponent } from './features/hero/hero';
import { AboutComponent } from './features/about/about';
import { ServicesComponent } from './features/services/services';
import { PodcastComponent } from './features/podcast/podcast';
import { TestimonialSectionComponent } from './features/testimonial/testimonial-section';
import { FooterSectionComponent } from './features/footer/footer-section';
import { ALL_FEATURE_CARDS_DATA, DEFAULT_FEATURE_CARD_DATA, DEFAULT_TESTIMONIAL_DATA, SECOND_TESTIMONIAL_DATA } from './shared/constants/card-data.constant';
import { FeatureCardData } from './shared/models/feature-card.interface';
import { TestimonialData } from './shared/models/testimonial.interface';

/**
 * Root Application Component presenting a unified, continuous landing page with dynamic section observer.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    ServicesComponent,
    PodcastComponent,
    TestimonialSectionComponent,
    FooterSectionComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent implements AfterViewInit, OnDestroy {
  // --- Data Signals / Constants ---
  public readonly featureCards: readonly FeatureCardData[] = ALL_FEATURE_CARDS_DATA;
  public readonly primaryFeatureCard: FeatureCardData = DEFAULT_FEATURE_CARD_DATA;
  public readonly primaryTestimonial: TestimonialData = DEFAULT_TESTIMONIAL_DATA;
  public readonly secondaryTestimonial: TestimonialData = SECOND_TESTIMONIAL_DATA;

  // --- State Signals ---
  public readonly activeSocialPlatform: WritableSignal<SocialPlatform> = signal<SocialPlatform>('linkedin');
  public readonly notificationMessage: WritableSignal<string | null> = signal<string | null>(null);

  /** Currently visible active section ID for sticky navbar logo and active link updates */
  public readonly activeSection: WritableSignal<string> = signal<string>('hero');

  /** Observer for entrance animations (fires once per section) */
  private animationObserver: IntersectionObserver | null = null;

  /**
   * Observer for active nav tracking.
   * Uses 21 graduated thresholds to continuously measure each section's
   * intersection ratio. The section with the highest ratio wins — preventing
   * premature switching when two sections are simultaneously partially visible.
   */
  private navObserver: IntersectionObserver | null = null;

  /** Live intersection ratio for every tracked section */
  private readonly sectionRatios = new Map<string, number>();

  public ngAfterViewInit(): void {
    const contentSectionIds = ['hero', 'about', 'services', 'podcast', 'testimonials', 'contact'];

    if (typeof IntersectionObserver !== 'undefined') {
      // ── 1. Animation observer (threshold 0.08 — triggers entrance once) ───
      this.animationObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('landing-page__section--visible');
              // Once animated in, no need to keep observing this element
              this.animationObserver?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08 }
      );

      // ── 2. Nav-active observer ────────────────────────────────────────────
      // 21 thresholds give fine-grained ratio updates across the full range.
      // On each callback, update this section's ratio then pick the winner.
      const navThresholds = Array.from({ length: 21 }, (_, i) => i / 20);

      this.navObserver = new IntersectionObserver(
        (entries) => {
          // Update the stored ratio for every changed entry
          entries.forEach((entry) => {
            this.sectionRatios.set(entry.target.id, entry.intersectionRatio);
          });

          // Pick the section with the highest visible ratio as the active one.
          // Ties (e.g. both at 0) leave the current activeSection unchanged.
          let bestId = '';
          let bestRatio = -1;
          this.sectionRatios.forEach((ratio, id) => {
            if (ratio > bestRatio) {
              bestRatio = ratio;
              bestId = id;
            }
          });

          if (bestId && bestRatio > 0) {
            this.activeSection.set(bestId);
          }
        },
        { threshold: navThresholds }
      );

      // ── 3. Mark hero visible immediately; register all sections ──────────
      const heroEl = document.getElementById('hero');
      if (heroEl) {
        heroEl.classList.add('landing-page__section--visible');
      }

      contentSectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          this.sectionRatios.set(id, 0);       // initialise ratio map
          this.animationObserver?.observe(el);
          this.navObserver?.observe(el);
        }
      });

    } else {
      // Fallback — no IntersectionObserver: make everything visible immediately
      contentSectionIds.forEach((id) => {
        document.getElementById(id)?.classList.add('landing-page__section--visible');
      });
    }
  }

  public ngOnDestroy(): void {
    this.animationObserver?.disconnect();
    this.navObserver?.disconnect();
  }

  // --- Public Methods ---
  public handleSocialSelect(platform: SocialPlatform): void {
    this.activeSocialPlatform.set(platform);
    this.showToast(`Selected social platform: ${platform}`);
  }

  public handleCallAction(): void {
    this.showToast('Initiating phone call to N-Compass TV...');
  }

  public showToast(message: string): void {
    this.notificationMessage.set(message);
    setTimeout((): void => {
      this.notificationMessage.set(null);
    }, 3000);
  }
}
