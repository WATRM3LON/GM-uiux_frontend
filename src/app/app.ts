import { Component, signal, WritableSignal, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { NavItem, SocialPlatform } from './shared/models/nav-item.interface';
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

  // ── Card stack scale ──────────────────────────────────────────────
  /** IDs of sections that participate in the card-stack (including hero) */
  private readonly cardSectionIds = ['hero', 'about', 'services', 'podcast', 'testimonials', 'contact'];

  /** Bound scroll handler reference — kept for removeEventListener cleanup */
  private scrollListener: (() => void) | null = null;

  /** rAF handle used to throttle the scale update to one frame per scroll event */
  private scaleRAF: number | null = null;

  public ngAfterViewInit(): void {
    const contentSectionIds = ['hero', 'about', 'services', 'podcast', 'testimonials', 'contact'];

    if (typeof IntersectionObserver !== 'undefined') {
      // ── 1. Animation observer (threshold 0.08 — triggers entrance once) ───
      this.animationObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('landing-page__section--visible');
              this.animationObserver?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08 }
      );

      // ── 2. Nav-active observer ────────────────────────────────────────────
      const navThresholds = Array.from({ length: 21 }, (_, i) => i / 20);

      this.navObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            this.sectionRatios.set(entry.target.id, entry.intersectionRatio);
          });

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
          this.sectionRatios.set(id, 0);
          this.animationObserver?.observe(el);
          this.navObserver?.observe(el);
        }
      });

    } else {
      contentSectionIds.forEach((id) => {
        document.getElementById(id)?.classList.add('landing-page__section--visible');
      });
    }

    // ── Card scale scroll listener ──────────────────────────────────
    this.scrollListener = () => {
      if (this.scaleRAF !== null) return;
      this.scaleRAF = requestAnimationFrame(() => {
        this.scaleRAF = null;
        this.updateCardScales();
      });
    };
    window.addEventListener('scroll', this.scrollListener, { passive: true });
    this.updateCardScales();
  }

  /**
   * For each card section, calculates scroll progress of incoming and outgoing cards.
   * - Active card at rest: scale(1.0), border-radius: 0px (fills viewport edge-to-edge).
   * - Incoming card: starts SMALL (scale 0.88) with 52px rounded corners, expanding smoothly to scale 1.0 / 0px border-radius as it reaches top focus.
   * - Covered card: scales DOWN (1.0 → 0.90) while smoothly restoring rounded corners (0px → 52px) and dimming into depth.
   * - Updates active section signal for logo color switching and nav highlights.
   */
  private updateCardScales(): void {
    const viewportH = window.innerHeight;
    const scrollY = window.scrollY;
    const numCards = this.cardSectionIds.length;
    const maxRadius = window.innerWidth >= 768 ? 52 : 36;

    const elements: (HTMLElement | null)[] = this.cardSectionIds.map(id => document.getElementById(id));
    const progresses: number[] = new Array(numCards - 1).fill(0);

    for (let i = 0; i < numCards - 1; i++) {
      const nextEl = elements[i + 1];
      if (!nextEl) continue;

      const nextTop = nextEl.getBoundingClientRect().top;
      const progress = Math.max(0, Math.min(1, (viewportH - nextTop) / viewportH));
      progresses[i] = progress;
    }

    for (let i = 0; i < numCards; i++) {
      const cardEl = elements[i];
      if (!cardEl) continue;

      let scale = 1;
      let brightness = 1;
      let borderRadius = 0;

      const coverProgress = i < numCards - 1 ? progresses[i] : 0;
      const incomingProgress = i > 0 ? progresses[i - 1] : 1;

      if (coverProgress > 0) {
        // Card i is being covered by card i+1 (or subsequent cards)
        let extraCover = 0;
        for (let j = i + 1; j < numCards - 1; j++) {
          extraCover += progresses[j];
        }
        const totalProgress = coverProgress + extraCover * 0.5;

        // Active card shrinks into depth as next card covers it (1.0 -> 0.90)
        scale = Math.max(0.90, 1 - totalProgress * 0.08);
        brightness = Math.max(0.70, 1 - totalProgress * 0.18);
        borderRadius = Math.min(maxRadius, coverProgress * maxRadius);
      } else if (incomingProgress < 1) {
        // Card i is incoming: starts SMALL (0.88) with 52px rounded corners,
        // and expands smoothly to 1.0 with 0px rounded corners as it reaches top focus!
        scale = 0.88 + incomingProgress * 0.12;
        brightness = 1;
        borderRadius = (1 - incomingProgress) * maxRadius;
      } else {
        // Card i is fully active at top: full-screen panel, 0px border-radius, scale 1.0
        scale = 1.0;
        brightness = 1.0;
        borderRadius = 0;
      }

      cardEl.style.transform = `scale(${scale.toFixed(4)})`;
      cardEl.style.filter = `brightness(${brightness.toFixed(3)})`;
      cardEl.style.borderRadius = `${borderRadius.toFixed(1)}px`;
    }

    // ── Active Section Detection for Navbar ─────────────────────────
    let currentActive = 'hero';
    for (let i = 0; i < numCards; i++) {
      const id = this.cardSectionIds[i];
      const el = elements[i];
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.top <= viewportH * 0.5) {
        currentActive = id;
      }
    }
    if (this.activeSection() !== currentActive) {
      this.activeSection.set(currentActive);
    }
  }

  public ngOnDestroy(): void {
    this.animationObserver?.disconnect();
    this.navObserver?.disconnect();
    if (this.scaleRAF !== null) {
      cancelAnimationFrame(this.scaleRAF);
    }
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
      this.scrollListener = null;
    }
  }

  // --- Public Methods ---
  public handleNavSelect(item: NavItem): void {
    const targetSection = item.id === 'home' ? 'hero' : item.id;
    this.activeSection.set(targetSection);
  }
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
