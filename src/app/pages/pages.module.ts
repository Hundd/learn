import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlashCardsComponent } from './flash-cards/flash-cards.component';

@NgModule({
  declarations: [FlashCardsComponent],
  imports: [
    CommonModule
  ],
  exports: [FlashCardsComponent],
  entryComponents: [FlashCardsComponent]
})
export class PagesModule { }
