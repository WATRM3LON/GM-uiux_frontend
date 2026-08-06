import { Component, signal, WritableSignal, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestimonialCardComponent } from '../../shared/components/testimonial-card/testimonial-card.component';
import { TestimonialData } from '../../shared/models/testimonial.interface';

export type TestimonialSlide = TestimonialData;

/**
 * TestimonialSectionComponent — "Don't Just Take Our Words For It" testimonial slider section with auto-sliding.
 */
@Component({
  selector: 'app-testimonial-section',
  standalone: true,
  imports: [CommonModule, TestimonialCardComponent],
  templateUrl: './testimonial-section.html',
  styleUrl: './testimonial-section.scss',
})
export class TestimonialSectionComponent implements OnInit, OnDestroy {
  @Output() authorClick = new EventEmitter<TestimonialData>();

  public readonly testimonials: readonly TestimonialData[] = [
    {
      id: 'susan-thompson',
      quoteText:
        "My favorite part about this business is I'm not alone. From continued training, answering my questions, giving me advise and they cheer me along! Thinking of taking the leap? I can highly recommend being a dealer with N-Compass TV.",
      authorName: 'SUSAN THOMPSON',
      authorTitle: 'WEB DEVELOPER',
      authorAvatarUrl: 'assets/images/testimonial2.png',
    },
    {
      id: 'jessey-kirk',
      quoteText:
        'The most important part of the Startup Framework is the samples. The samples form a set of usable pages you can use as is or you can add new blocks from UI Kit.',
      authorName: 'JESSEY KIRK',
      authorTitle: 'DESIGNMODO',
      authorAvatarUrl: 'assets/images/testimonial1.png',
    },
    {
      id: 'sarah-jenkins',
      quoteText:
        'N-Compass TV has transformed our local business presence. The indoor billboard placement gave us incredible visibility in our community!',
      authorName: 'SARAH JENKINS',
      authorTitle: 'MARKETING DIRECTOR',
      authorAvatarUrl: 'assets/images/testimonial2.png',
    },
  ];

  public readonly activeIndex: WritableSignal<number> = signal<number>(0);

  private autoSlideInterval: ReturnType<typeof setInterval> | null = null;

  public ngOnInit(): void {
    this.startAutoSlide();
  }

  public ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  public nextSlide(): void {
    const current = this.activeIndex();
    this.activeIndex.set((current + 1) % this.testimonials.length);
  }

  public goToSlide(index: number): void {
    this.activeIndex.set(index);
    this.resetAutoSlide();
  }

  public handleAuthorSelect(slide: TestimonialData): void {
    this.authorClick.emit(slide);
  }

  private startAutoSlide(): void {
    this.stopAutoSlide();
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 4000);
  }

  private stopAutoSlide(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }

  private resetAutoSlide(): void {
    this.stopAutoSlide();
    this.startAutoSlide();
  }
}
