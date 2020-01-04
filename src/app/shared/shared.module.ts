import { MaterialModule } from './material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation.component';
import { CardComponent } from './components/card/card.component';

const components = [NavigationComponent, CardComponent];
@NgModule({
  declarations: components,
  imports: [CommonModule, MaterialModule],
  exports: [MaterialModule, ...components],
})
export class SharedModule {}
