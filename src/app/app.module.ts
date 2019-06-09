import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import { MaterialModule } from '@shared/material/material.module'
import { ReducersModule } from '@reducers/reducers.module'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { PagesModule } from './pages/pages.module'
import { environment } from 'src/environments/environment'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReducersModule,
    PagesModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production // Restrict extension to log-only mode
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
