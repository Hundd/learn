import { Card } from './../models/card.model';
import { Action } from '@ngrx/store';

export interface State {
  currentCardIndex: number;
  cards: Card[];
}

export const initialState: State = {
  currentCardIndex: 0,
  cards: []
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    default:
      return state;
  }
}
