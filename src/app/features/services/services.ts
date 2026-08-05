import { Component, signal, WritableSignal, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureCardComponent } from '../../shared/components/feature-card/feature-card.component';
import { FeatureCardData } from '../../shared/models/feature-card.interface';

export interface ServiceItem extends FeatureCardData {
  badgeType: 'branding' | 'lead-gen' | 'foundational';
}

/**
 * ServicesComponent — Multichannel Advertising Services section with interactive carousel.
 */
@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, FeatureCardComponent],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class ServicesComponent implements OnInit, OnDestroy {
  /** Emits when a service card's action button is clicked */
  @Output() serviceClick = new EventEmitter<FeatureCardData>();

  public readonly services: readonly ServiceItem[] = [
    {
      id: 'streaming-audio',
      badgeText: 'BRANDING',
      badgeType: 'branding',
      title: 'Streaming Audio',
      description:
        'Reach your clients audiences as they immerse themselves in their favorite podcasts, music, and radio shows.',
      backgroundImageUrl: 'assets/images/streamingaudio.png',
      buttonText: 'Learn More',
    },
    {
      id: 'ppc',
      badgeText: 'LEAD GEN',
      badgeType: 'lead-gen',
      title: 'PPC (Pay Per Click)',
      description:
        "Places your customers in front of prospects at the exact moment they're searching for their products or services.",
      backgroundImageUrl: 'assets/images/ppc.png',
      buttonText: 'Learn More',
    },
    {
      id: 'youtube-advertising',
      badgeText: 'BRANDING',
      badgeType: 'branding',
      title: 'YouTube Advertising',
      description:
        "Introduce your client's brand and build awareness among potential customers on YouTube.",
      backgroundImageUrl: 'assets/images/youtubeadvertising.png',
      buttonText: 'Learn More',
    },
    {
      id: 'website-development',
      badgeText: 'FOUNDATIONAL',
      badgeType: 'foundational',
      title: 'Website Development',
      description:
        "A modern website is critical for developing Local SEO and your customer's brand with detailed and engaging content.",
      backgroundImageUrl: 'assets/images/webdev.png',
      buttonText: 'Learn More',
    },
    {
      id: 'ott-ctv-advertising',
      badgeText: 'BRANDING',
      badgeType: 'branding',
      title: 'OTT / CTV Advertising',
      description:
        "Over-The-Top and Connected TV utilizes precise targeting and dynamic content to place ads on streaming platforms.",
      backgroundImageUrl: 'assets/images/ottctv.png',
      buttonText: 'Learn More',
    },
    {
      id: 'social-media-ads',
      badgeText: 'LEAD GEN',
      badgeType: 'lead-gen',
      title: 'Social Media Ads',
      description:
        'Targeted social media advertising campaigns designed to maximize engagement and ROI across platforms.',
      backgroundImageUrl: 'assets/images/socialmediaads.png',
      buttonText: 'Learn More',
    },
    {
      id: 'display-ads',
      badgeText: 'BRANDING',
      badgeType: 'branding',
      title: 'Display Ads',
      description:
        'Eye-catching digital display ads broadcasted across local community venues and digital billboards.',
      backgroundImageUrl: 'assets/images/displayads.png',
      buttonText: 'Learn More',
    },
    {
      id: 'gbp-management',
      badgeText: 'FOUNDATIONAL',
      badgeType: 'foundational',
      title: 'Google Business Profile Management',
      description:
        "Increase your customer's presence on Google and their Local SEO.",
      backgroundImageUrl: 'assets/images/gbp.png',
      buttonText: 'Learn More',
    },
  ];

  /** Active slide index signal for carousel navigation */
  public readonly activeIndex: WritableSignal<number> = signal<number>(0);

  /** Number of cards visible per view (4 on desktop) */
  public readonly cardsPerView: WritableSignal<number> = signal<number>(4);

  private resizeListener?: () => void;

  public ngOnInit(): void {
    this.updateCardsPerView();
    if (typeof window !== 'undefined') {
      this.resizeListener = (): void => this.updateCardsPerView();
      window.addEventListener('resize', this.resizeListener);
    }
  }

  public ngOnDestroy(): void {
    if (typeof window !== 'undefined' && this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
  }

  /**
   * Updates cardsPerView signal dynamically based on screen width.
   */
  private updateCardsPerView(): void {
    if (typeof window === 'undefined') return;
    const width = window.innerWidth;
    if (width >= 1024) {
      this.cardsPerView.set(4);
    } else if (width >= 640) {
      this.cardsPerView.set(2);
    } else {
      this.cardsPerView.set(1);
    }

    const maxIdx = this.getMaxIndex();
    if (this.activeIndex() > maxIdx) {
      this.activeIndex.set(maxIdx);
    }
  }

  /**
   * Returns maximum slide index to keep cards visible at all times.
   */
  public getMaxIndex(): number {
    return Math.max(0, this.services.length - this.cardsPerView());
  }

  /**
   * Array of valid slide indices for pagination indicators.
   */
  public get visibleDots(): number[] {
    const totalDots = this.getMaxIndex() + 1;
    return Array.from({ length: totalDots }, (_, i) => i);
  }

  /**
   * Navigates carousel to the previous slide.
   */
  public prevSlide(): void {
    const current = this.activeIndex();
    const maxIdx = this.getMaxIndex();
    this.activeIndex.set(current > 0 ? current - 1 : maxIdx);
  }

  /**
   * Navigates carousel to the next slide.
   */
  public nextSlide(): void {
    const current = this.activeIndex();
    const maxIdx = this.getMaxIndex();
    this.activeIndex.set(current < maxIdx ? current + 1 : 0);
  }

  /**
   * Sets current slide to index.
   * @param index Target slide index
   */
  public goToSlide(index: number): void {
    this.activeIndex.set(Math.min(Math.max(0, index), this.getMaxIndex()));
  }

  /**
   * Handles click on service card.
   * @param item Service item payload
   */
  public handleServiceSelect(item: FeatureCardData): void {
    this.serviceClick.emit(item);
  }
}

