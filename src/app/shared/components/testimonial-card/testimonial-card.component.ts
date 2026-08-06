import { Component, input, output, OutputEmitterRef } from '@angular/core';
import { TestimonialData } from '../../models/testimonial.interface';
import { DEFAULT_TESTIMONIAL_DATA } from '../../constants/card-data.constant';

/**
 * Reusable testimonial card component displaying customer quotes and author details.
 */
@Component({
  selector: 'app-testimonial-card',
  standalone: true,
  templateUrl: './testimonial-card.component.html',
  styleUrl: './testimonial-card.component.scss'
})
export class TestimonialCardComponent {
  // --- I/O ---
  public readonly data = input<TestimonialData>(DEFAULT_TESTIMONIAL_DATA);
  public readonly cardClick: OutputEmitterRef<TestimonialData> = output<TestimonialData>();

  // --- Public Methods ---
  public handleCardClick(): void {
    this.cardClick.emit(this.data());
  }

  public getAuthorMeta(): string {
    const testimonial = this.data();
    return testimonial.authorTitle
      ? `${testimonial.authorName}, ${testimonial.authorTitle}`
      : testimonial.authorName;
  }
}
