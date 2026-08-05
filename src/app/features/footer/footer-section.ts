import { Component, signal, WritableSignal, Output, EventEmitter, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialPlatform } from '../../shared/models/nav-item.interface';

/**
 * FooterSectionComponent — Complete Footer section featuring CTA banner and slide-up dark footer drawer.
 */
@Component({
  selector: 'app-footer-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer-section.html',
  styleUrl: './footer-section.scss',
})
export class FooterSectionComponent implements AfterViewInit, OnDestroy {
  /** Emits when "Get In Touch" button is clicked */
  @Output() getInTouchClick = new EventEmitter<void>();

  /** Emits when social icon is clicked */
  @Output() socialClick = new EventEmitter<SocialPlatform>();

  /** Signal controlling whether the dark footer drawer has slid up into view */
  public readonly isSlidUp: WritableSignal<boolean> = signal<boolean>(false);

  public readonly currentYear: number = new Date().getFullYear();

  private intersectionObserver: IntersectionObserver | null = null;

  constructor(private el: ElementRef) {}

  public ngAfterViewInit(): void {
    // Automatically trigger slide-up when footer section enters viewport
    if (typeof IntersectionObserver !== 'undefined') {
      this.intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Delay slightly for dramatic entrance effect
              setTimeout(() => {
                this.isSlidUp.set(true);
              }, 300);
            }
          });
        },
        { threshold: 0.25 }
      );
      this.intersectionObserver.observe(this.el.nativeElement);
    } else {
      // Fallback if IntersectionObserver not available
      setTimeout(() => this.isSlidUp.set(true), 500);
    }
  }

  public ngOnDestroy(): void {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  /**
   * Manually toggles slide-up footer state for demonstration.
   */
  public toggleSlide(): void {
    this.isSlidUp.update((state) => !state);
  }

  public handleGetInTouch(): void {
    this.getInTouchClick.emit();
  }

  public handleSocialSelect(platform: SocialPlatform): void {
    this.socialClick.emit(platform);
  }
}
