import { createSelector } from '@ngrx/store';

import { AppState } from '@reducers/reducers.module';
import * as fromCards from '@reducers/cards.reducer';

export const selectCardState = (state: AppState) => state.cardsState;

export const selectCards = createSelector(
  selectCardState,
  (state: fromCards.State) => state.cards
);

export const selectCurrentCardIndex = createSelector(
  selectCardState,
  (state: fromCards.State) => state.currentCardIndex
);
