import { Action } from '@ngrx/store';

export enum CardActionTypes {
  LoadCards = '[Card] Load Cards',
  LoadCardsSuccess = '[Card] Load Cards Success',
  LoadCardsFailure = '[Card] Load Cards Failure',
}

export class LoadCards implements Action {
  readonly type = CardActionTypes.LoadCards;
}

export class LoadCardsSuccess implements Action {
  readonly type = CardActionTypes.LoadCardsSuccess;
  constructor(public payload: { data: unknown }) { }
}

export class LoadCardsFailure implements Action {
  readonly type = CardActionTypes.LoadCardsFailure;
  constructor(public payload: { error: unknown }) { }
}

export type CardActions = LoadCards | LoadCardsSuccess | LoadCardsFailure;

