import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { StoreModule } from '@ngrx/store'
import * as fromCards from './cards.reducer'

const storeModule = StoreModule.forRoot({
  cards: fromCards.reducer
})

@NgModule({
  declarations: [],
  imports: [CommonModule, storeModule],
  exports: [StoreModule]
})
export class ReducersModule {}
