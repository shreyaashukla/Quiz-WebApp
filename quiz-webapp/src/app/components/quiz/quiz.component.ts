import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  fullQuestionBank = [];

  questions: any[] = [];
  currentQuestion: any;
  currentIndex = 0;
  selectedAnswers: string[] = [];
  score = 0;

  constructor(private router: Router, private http: HttpClient) {}


  ngOnInit(): void {
  this.http.get<any[]>('http://localhost:3000/api/questions')
    .subscribe(data => {
      const shuffled = data.sort(() => 0.5 - Math.random());
      this.questions = shuffled.slice(0, 5);
      this.currentIndex = 0;
      this.currentQuestion = this.questions[this.currentIndex];
    });
}


  selectAnswer(option: string) {
    this.selectedAnswers[this.currentIndex] = option;
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.currentQuestion = this.questions[this.currentIndex];
    }
  }

  next() {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      this.currentQuestion = this.questions[this.currentIndex];
    }
  }

  submitQuiz() {
  this.score = 0;
  this.questions.forEach((q, i) => {
    if (this.selectedAnswers[i] === q.answer) {
      this.score++;
    }
  });

  const payload = {
    name: history.state.name,  // or replace with 'this.userName' if stored elsewhere
    score: this.score
  };

  // ✅ Send POST request to backend
  this.http.post('http://localhost:3000/api/scores', payload).subscribe(() => {
    // Navigate to result page after saving
    this.router.navigate(['/result'], {
      state: {
        name: payload.name,
        score: this.score
      }
    });
  });
}

  }

