import { Component, OnInit } from '@angular/core';
import { MinesweeperService } from 'src/domain/services/minesweeper/minesweeper.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {
  time: number = 0;

  constructor(public minesweeper: MinesweeperService) { }

  ngOnInit(): void {
    setInterval(() => {
      this.time++;
    }, 1000);
  }

  getTime() {
    return this.time.toString().padStart(3, '0');
  }

  retryGame() {
    this.minesweeper.resetGame();
    this.time = 0;
  }
}
