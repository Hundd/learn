import { CardsService, CardAudiConfig } from '@core/services/cards.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '@models/card.model';

@Component({
  selector: 'app-flash-cards',
  templateUrl: './flash-cards.component.html',
  styleUrls: ['./flash-cards.component.scss'],
})
export class FlashCardsComponent implements OnInit {
  currentCardIndex = 0;
  dataReady$: Observable<boolean>;
  autoPlay = true;

  constructor(private cardsService: CardsService) {}

  ngOnInit() {
    this.dataReady$ = this.cardsService.dataReady;
  }

  get cards(): Card[] {
    return this.cardsService.cards;
  }

  get currentCard(): Card {
    return this.cards[this.currentCardIndex];
  }

  get audio(): CardAudiConfig[] {
    return this.cardsService.getAudioConfigForCard(this.currentCard.id);
  }
  get totalItems() {
    return this.cards.length;
  }

  onPreviousCard() {
    if (this.currentCardIndex > 0) {
      this.currentCardIndex -= 1;
    } else if (this.cards.length) {
      this.currentCardIndex = this.cards.length - 1;
    }
  }

  onNextCard() {
    if (this.currentCardIndex < this.cards.length - 1) {
      this.currentCardIndex += 1;
    } else {
      this.currentCardIndex = 0;
    }
  }

  onToggleAudio() {
    this.autoPlay = !this.autoPlay;
  }
}
