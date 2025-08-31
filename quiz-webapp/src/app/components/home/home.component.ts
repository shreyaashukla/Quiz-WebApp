import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  userName: string = '';

  constructor(private router: Router) {}

  startQuiz() {
    if (this.userName.trim()) {
      this.router.navigate(['/quiz'], {
        state: { name: this.userName }
      });
    } else {
      alert('Please enter your name');
    }
  }
}
