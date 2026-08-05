import { Component, input, OutputEmitterRef, output } from '@angular/core';
import { FeatureCardData } from '../../models/feature-card.interface';
import { DEFAULT_FEATURE_CARD_DATA } from '../../constants/card-data.constant';

/**
 * Premium dark feature card component with background image overlay and call-to-action button.
 */
@Component({
  selector: 'app-feature-card',
  standalone: true,
  templateUrl: './feature-card.component.html',
  styleUrl: './feature-card.component.scss'
})
export class FeatureCardComponent {
  // --- I/O ---
  public readonly data = input<FeatureCardData>(DEFAULT_FEATURE_CARD_DATA);

  public readonly cardClick: OutputEmitterRef<string> = output<string>();

  // --- Public Methods ---
  /**
   * Triggers the card action navigation handler.
   * @param event Mouse click event
   * @returns void
   */
  public handleActionClick(event: MouseEvent): void {
    event.stopPropagation();
    this.cardClick.emit(this.data().id);
  }
}
