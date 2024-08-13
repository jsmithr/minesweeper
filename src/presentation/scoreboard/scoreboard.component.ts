import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MinesweeperService } from 'src/domain/services/minesweeper/minesweeper.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit, OnChanges {
  time: number = 0;
  timer: any;

  constructor(public minesweeperService: MinesweeperService) { }

  ngOnInit(): void {
    this.timer = setInterval(() => {
      if (this.minesweeperService.isPlaying() && !this.minesweeperService.getStatusGame().lose)
        this.time++;
    }, 1000);
  }

  ngOnChanges(changes: SimpleChanges): void {
    let { lose, win } = this.minesweeperService.getStatusGame()
    console.log("🚀 ~ ScoreboardComponent ~ ngOnChanges ~ lose, win:", lose, win)
    if (lose || win) {
      clearInterval(this.timer);
    }
  }

  getTime() {
    return this.time.toString().padStart(3, '0');
  }

  retryGame() {
    this.minesweeperService.resetGame();
    this.time = 0;
  }

  getMines() {
    return this.minesweeperService.getMinesAvailable().toString().padStart(3, '0');
  }
}
