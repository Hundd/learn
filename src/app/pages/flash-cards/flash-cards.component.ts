import { AppState } from '@reducers/reducers.module';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

// import * as fromCards from '@reducers/cards.reducer';
import * as selectors from '@selectors/index';
import { Card } from '@models/card.model';

@Component({
  selector: 'app-flash-cards',
  templateUrl: './flash-cards.component.html',
  styleUrls: ['./flash-cards.component.scss'],
})
export class FlashCardsComponent implements OnInit {
  cards$: Observable<Card[]>;
  currentCardIndex$: Observable<number>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.cards$ = this.store.pipe(select(selectors.selectCards));
    this.currentCardIndex$ = this.store.pipe(
      select(selectors.selectCurrentCardIndex)
    );
  }
}
