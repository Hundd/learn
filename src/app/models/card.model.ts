export interface CardModel {
  targetPhrase: string;
  translation: string;
  id: string;
}

export class Card implements CardModel {
  constructor(
    public targetPhrase: string,
    public translation: string,
    public id: string
  ) {}
}
