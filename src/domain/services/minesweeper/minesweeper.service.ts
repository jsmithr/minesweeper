import { Injectable } from '@angular/core';
import { Mine } from 'src/data/mine';
import { Level } from 'src/domain/model/level.model';

type GAME_TYPE = {
  win: boolean,
  lose: boolean,
  normal: boolean,
  click: boolean
};

@Injectable({
  providedIn: 'root'
})
export class MinesweeperService {

  private level: Level = 'easy';
  private statusGame: GAME_TYPE;
  private minesAvailable: number;
  private resetBoard: any;
  private beginGame: any = false;

  constructor() { }

  initGame() {
    this.beginGame = true;
  }

  setMinesAvailable(mines: number) {
    this.minesAvailable = mines;
  }

  getMinesAvailable() {
    return this.minesAvailable;
  }

  setLevel(level: Level) {
    this.level = level;
  }

  getLevel() {
    return this.level;
  }

  setStatusGame(statusGame: 'win' | 'lose' | 'normal' | 'click') {
    this.statusGame = {
      win: statusGame === 'win',
      lose: statusGame === 'lose',
      normal: statusGame === 'normal',
      click: statusGame === 'click'
    };
  }

  getStatusGame() {
    return this.statusGame;
  }

  isPlaying(): boolean {
    return this.beginGame;
  }

  setResetBoard(funcReset: any) {
    this.resetBoard = funcReset;
  }

  doResetBoard(funcReset: any) {
    this.resetBoard = funcReset;
  }

  gameOver() {
    this.setStatusGame('lose');
  }

  resetGame() {
    this.statusGame = {
      win: false,
      lose: false,
      normal: true,
      click: false
    };
    this.beginGame = false;

    if (this.resetBoard)
      this.resetBoard();
  }
}
