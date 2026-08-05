import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * PodcastComponent — "Listen To Our Podcast" section featuring Spotify/Apple Podcasts buttons & video player.
 */
@Component({
  selector: 'app-podcast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './podcast.html',
  styleUrl: './podcast.scss',
})
export class PodcastComponent {
  /** Emits when Spotify button is clicked */
  @Output() spotifyClick = new EventEmitter<void>();

  /** Emits when Apple Podcasts button is clicked */
  @Output() appleClick = new EventEmitter<void>();

  /** Emits when play video is clicked */
  @Output() playClick = new EventEmitter<void>();

  public onSpotifyClick(): void {
    this.spotifyClick.emit();
  }

  public onAppleClick(): void {
    this.appleClick.emit();
  }

  public onPlayClick(): void {
    this.playClick.emit();
  }
}
