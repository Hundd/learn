import { DataService } from '@core/services/data.service';
import { CardAudiConfig } from '@core/services/cards.service';
import { Card } from '@models/card.model';
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit, OnChanges {
  isFlipped = false;
  audioPlayer = new Audio();
  constructor(private dataService: DataService) {}

  @Input() card: Card;
  @Input() audio: CardAudiConfig[];
  @Input() autoPlay: boolean;
  @Input() currentCardIndex: number;
  @Input() totalItems: number;

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges) {
    if ('card' in changes) {
      this.isFlipped = false;
      if ('audio' in changes && this.autoPlay) {
        this.play(1, 'normal');
      }
    }
  }

  get cardTitle(): string {
    return this.isFlipped ? this.card.translation : this.card.targetPhrase;
  }

  onToggleCard() {
    this.isFlipped = !this.isFlipped;
  }

  onPlay(id: number, type: 'slow' | 'normal') {
    this.play(id, type);
  }

  private play(id: number, type: 'slow' | 'normal') {
    this.audioPlayer.src = this.dataService.resolveAssetUrl(
      this.audio[id][type]
    );
    this.audioPlayer.load();
    this.audioPlayer.play();
  }
}
