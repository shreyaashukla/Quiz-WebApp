import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {
  userName: string = '';
  score: number = 0;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { name: string, score: number };

    if (state) {
      this.userName = state.name;
      this.score = state.score;
      this.saveToLeaderboard(this.userName, this.score);
    }
  }

  saveToLeaderboard(name: string, score: number) {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');
    leaderboard.push({ name, score });
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
  }
}
