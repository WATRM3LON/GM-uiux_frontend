import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * AboutComponent — About / Journey & Model section for N-Compass TV.
 * Displays company history, business model, and key metrics in a modern grid layout.
 */
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class AboutComponent {
  /** Emits when "Learn More" in Our Journey card is clicked */
  @Output() learnMoreClick = new EventEmitter<void>();

  /** Emits when arrow button in Our Model card is clicked */
  @Output() modelClick = new EventEmitter<void>();

  public handleLearnMore(): void {
    this.learnMoreClick.emit();
  }

  public handleModelAction(): void {
    this.modelClick.emit();
  }
}
