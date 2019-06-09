import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

const materialModules = [
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatSidenavModule
]

@NgModule({
  declarations: [],
  imports: [CommonModule, ...materialModules],
  exports: [...materialModules]
})
export class MaterialModule {}
