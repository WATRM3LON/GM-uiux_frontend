import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';


/**
 * HeroComponent — Full-viewport hero section for N-Compass TV landing page.
 * Features a dark overlay with vertical bar pattern, large headline, CTA buttons,
 * and the N-Compass TV watermark logo.
 */
@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class HeroComponent {
  /** Emits when the "Learn More" CTA is clicked. */
  @Output() learnMoreClick = new EventEmitter<void>();

  /** Emits when the "Watch Video" button is clicked. */
  @Output() watchVideoClick = new EventEmitter<void>();

  /**
   * Handles "Learn More" button click.
   * @returns void
   */
  public handleLearnMore(): void {
    this.learnMoreClick.emit();
  }

  /**
   * Handles "Watch Video" button click.
   * @returns void
   */
  public handleWatchVideo(): void {
  window.open(
    'https://www.youtube.com/watch?v=ES-QrquEH8M',
    '_blank',
    'noopener,noreferrer'
  );
}
}
