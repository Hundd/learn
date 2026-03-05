import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Learn New Languages';
  isDrawerOpen = false;

  onToggleDrawer() {
    this.isDrawerOpen = !this.isDrawerOpen;
  }
}
