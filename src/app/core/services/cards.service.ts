import { Card } from '@models/card.model'
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'

const cards = [
  new Card('kill', 'убивать'),
  new Card('go', 'идти'),
  new Card('kiss', 'целовать')
]

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  constructor() {}

  getCards(): Observable<Card[]> {
    return of(cards)
  }
}
