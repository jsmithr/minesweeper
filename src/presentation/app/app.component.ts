import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Minesweeper';
  level: 'easy' | 'medium' | 'hard' | 'custom';
  levelList = [
    { value: 'easy', text: 'Fácil' },
    { value: 'medium', text: 'Medio' },
    { value: 'hard', text: 'Experto' },
    { value: 'custom', text: 'Personalizado' }
  ]
}
