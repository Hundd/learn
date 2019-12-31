import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const modules = [HttpClientModule, ReactiveFormsModule, FormsModule];

@NgModule({
  imports: modules,
  exports: modules,
})
export class CoreModule {}
