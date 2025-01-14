import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [ RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ExStartUpFront';

  constructor(private router: Router) {
  }

  logout() {
    localStorage.removeItem('jwt_token');
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
