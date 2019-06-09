import { Card } from './../models/card.model'
import { Action } from '@ngrx/store'

export interface State {
  currentCard: number
  cards: Card[]
}

export const initialState: State = {
  currentCard: 0,
  cards: []
}

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    default:
      return state
  }
}
