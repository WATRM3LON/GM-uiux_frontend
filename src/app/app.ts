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

  private sectionObserver: IntersectionObserver | null = null;

  public ngAfterViewInit(): void {
    if (typeof IntersectionObserver !== 'undefined') {
      const contentSectionIds = ['hero', 'about', 'services', 'podcast', 'testimonials', 'contact'];

      // Observer for content sections: entrance animation + active nav tracking.
      // Once a section becomes visible it stays visible (animation plays once).
      this.sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.activeSection.set(entry.target.id);
              entry.target.classList.add('landing-page__section--visible');
            }
          });
        },
        { threshold: 0.15 }
      );

      // Mark hero visible immediately on load
      const heroEl = document.getElementById('hero');
      if (heroEl) {
        heroEl.classList.add('landing-page__section--visible');
      }

      contentSectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          this.sectionObserver?.observe(el);
        }
      });

    } else {
      // Fallback — no IntersectionObserver: make everything visible immediately
      ['hero', 'about', 'services', 'podcast', 'testimonials', 'contact'].forEach((id) => {
        document.getElementById(id)?.classList.add('landing-page__section--visible');
      });
    }
  }

  public ngOnDestroy(): void {
    this.sectionObserver?.disconnect();
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
