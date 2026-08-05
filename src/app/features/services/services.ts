import { Component, signal, WritableSignal, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ServiceItem {
  id: string;
  badge: string;
  badgeType: 'branding' | 'lead-gen' | 'foundational';
  title: string;
  description: string;
  imageUrl: string;
}

/**
 * ServicesComponent — Multichannel Advertising Services section with interactive carousel.
 */
@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class ServicesComponent {
  /** Emits when a service card's "Learn More" button is clicked */
  @Output() serviceClick = new EventEmitter<ServiceItem>();

  public readonly services: readonly ServiceItem[] = [
    {
      id: 'streaming-audio',
      badge: 'BRANDING',
      badgeType: 'branding',
      title: 'Streaming Audio',
      description:
        'Reach your clients audiences as they immerse themselves in their favorite podcasts, music, and radio shows.',
      imageUrl: 'streamingaudio.png',
    },
    {
      id: 'ppc',
      badge: 'LEAD GEN',
      badgeType: 'lead-gen',
      title: 'PPC (Pay Per Click)',
      description:
        "Places your customers in front of prospects at the exact moment they're searching for their products or services.",
      imageUrl: 'ppc.png',
    },
    {
      id: 'youtube-advertising',
      badge: 'BRANDING',
      badgeType: 'branding',
      title: 'YouTube Advertising',
      description:
        "Introduce your client's brand and build awareness among potential customers on YouTube.",
      imageUrl: 'youtubeadvertising.png',
    },
    {
      id: 'website-development',
      badge: 'FOUNDATIONAL',
      badgeType: 'foundational',
      title: 'Website Development',
      description:
        "A modern website is critical for developing Local SEO and your customer's brand with detailed and engaging content.",
      imageUrl: 'webdev.png',
    },
    {
      id: 'social-media-ads',
      badge: 'LEAD GEN',
      badgeType: 'lead-gen',
      title: 'Social Media Ads',
      description:
        'Targeted social media advertising campaigns designed to maximize engagement and ROI across platforms.',
      imageUrl: 'socialmediaads.png',
    },
    {
      id: 'display-ads',
      badge: 'BRANDING',
      badgeType: 'branding',
      title: 'Display Ads',
      description:
        'Eye-catching digital display ads broadcasted across local community venues and digital billboards.',
      imageUrl: 'displayads.png',
    },
    
  ];

  /** Active slide index signal for carousel navigation */
  public readonly activeIndex: WritableSignal<number> = signal<number>(0);

  /**
   * Navigates carousel to the previous slide.
   */
  public prevSlide(): void {
    const current = this.activeIndex();
    this.activeIndex.set(current > 0 ? current - 1 : this.services.length - 1);
  }

  /**
   * Navigates carousel to the next slide.
   */
  public nextSlide(): void {
    const current = this.activeIndex();
    this.activeIndex.set(current < this.services.length - 1 ? current + 1 : 0);
  }

  /**
   * Sets current slide to index.
   * @param index Target slide index
   */
  public goToSlide(index: number): void {
    this.activeIndex.set(index);
  }

  /**
   * Handles Learn More click on service card.
   * @param item Service item payload
   */
  public handleServiceSelect(item: ServiceItem): void {
    this.serviceClick.emit(item);
  }
}
