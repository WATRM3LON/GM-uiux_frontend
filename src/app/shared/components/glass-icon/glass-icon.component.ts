import { Component, input, OutputEmitterRef, output } from '@angular/core';
import { SocialPlatform } from '../../models/nav-item.interface';

/**
 * Reusable glassmorphic icon button for social links and action triggers.
 */
@Component({
  selector: 'app-glass-icon',
  standalone: true,
  templateUrl: './glass-icon.component.html',
  styleUrl: './glass-icon.component.scss'
})
export class GlassIconComponent {
  // --- I/O ---
  public readonly platform = input.required<SocialPlatform>();
  public readonly isActive = input<boolean>(false);
  public readonly href = input<string>('#');
  public readonly ariaLabel = input<string>('Social media link');

  public readonly iconClick: OutputEmitterRef<SocialPlatform> = output<SocialPlatform>();

  // --- Public Methods ---
  /**
   * Handles click events and emits the platform identifier.
   * @param event The mouse click event
   * @returns void
   */
  public handleClick(event: MouseEvent): void {
    if (this.href() === '#') {
      event.preventDefault();
    }
    this.iconClick.emit(this.platform());
  }

  /**
   * Computes the SVG sprite anchor ID for the current platform.
   * @returns The sprite anchor fragment string
   */
  public getSpriteAnchor(): string {
    return `assets/sprite.svg#icon-${this.platform()}`;
  }
}
