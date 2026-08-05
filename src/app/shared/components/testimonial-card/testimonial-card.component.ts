import { Component, input } from '@angular/core';
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

  // --- Public Methods ---
  /**
   * Retrieves the combined author meta caption string.
   * @returns Formatted author name and title
   */
  public getAuthorMeta(): string {
    const testimonial = this.data();
    return `${testimonial.authorName}, ${testimonial.authorTitle}`;
  }
}
