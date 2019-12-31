import { MaterialModule } from './material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation.component';

const components = [NavigationComponent];
@NgModule({
  declarations: components,
  imports: [CommonModule, MaterialModule],
  exports: [MaterialModule, ...components],
})
export class SharedModule {}
