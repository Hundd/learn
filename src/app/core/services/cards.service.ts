import { DataService } from '@core/services/data.service';
import { Card } from '@models/card.model';
import { Injectable } from '@angular/core';
import { Observable, from, forkJoin, BehaviorSubject } from 'rxjs';
import { map, mergeMap, toArray, tap } from 'rxjs/operators';

interface TurkishServerItem {
  turkeyText: string;
  englishText: string;
  id: string;
}
export interface CardAudiConfig {
  slow: string;
  normal: string;
}

interface TurkishServerConfig {
  [id: string]: CardAudiConfig[];
}

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  cards: Card[];
  audioConfig: TurkishServerConfig;
  dataReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private dataService: DataService) {
    forkJoin([this.getTurkishCards(), this.getTurkishConfig()])
      .pipe(
        tap(([cards, config]) => {
          this.cards = cards;
          this.audioConfig = config;
          this.dataReady.next(true);
        })
      )
      .subscribe();
  }

  getAudioConfigForCard(id: string): CardAudiConfig[] {
    return this.audioConfig[id];
  }

  private getTurkishCards(): Observable<Card[]> {
    return this.dataService.loadDictionary().pipe(
      mergeMap((collection: TurkishServerItem[]) =>
        from(collection).pipe(
          map(item => new Card(item.turkeyText, item.englishText, item.id)),
          toArray()
        )
      )
    );
  }

  private getTurkishConfig(): Observable<TurkishServerConfig> {
    return this.dataService.loadConfig();
  }
}
