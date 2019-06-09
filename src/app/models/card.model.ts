export interface CardModel {
  targetPhrase: string
  translation: string
}

export class Card implements CardModel {
  constructor(public targetPhrase: string, public translation: string) {}
}
