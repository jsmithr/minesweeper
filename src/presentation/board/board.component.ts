import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Board } from 'src/data/board';
import { Cell } from 'src/data/cell';
import { Mine } from 'src/data/mine';
import { Level } from 'src/domain/model/level.model';
import { MinesweeperService } from 'src/domain/services/minesweeper/minesweeper.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnChanges {
  @Input() cols: number;
  @Input() rows: number;
  @Input() levelUser: Level;
  @Input() minesUser: number = 0;
  board: Cell[][];
  mines: Mine[];
  sizeBoard: { rows: number, cols: number };

  constructor(public minesweeperService: MinesweeperService) {

  }

  ngOnInit(): void {
    this.minesweeperService.setResetBoard(() => this.initGame());
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initGame();
  }

  conextMenu(event: any) {
    event.preventDefault();
  }

  initGame() {
    this.sizeBoard = this.getSizeBoard();
    this.board = this.generateBoard();
    this.mines = this.setPositionMines(this.getCountMines());
    this.minesweeperService.setMinesAvailable(this.mines.length);
    this.setValueCell();
  }

  getSizeBoard() {
    const leves = {
      easy: { rows: 8, cols: 8 },
      medium: { rows: 16, cols: 16 },
      hard: { rows: 16, cols: 30 },
      custom: { rows: this.rows, cols: this.cols },
    }
    return leves[this.levelUser];
  }

  generateBoard(): Cell[][] {
    return Array.from({ length: this.sizeBoard.rows }, (_, i) =>
      Array.from({ length: this.sizeBoard.cols }, (_, j) => ({ status: 'H', value: 0 }))
    );
  }

  getCountMines() {
    const leves = {
      easy: 10,
      medium: 40,
      hard: 99,
      custom: this.minesUser || 0,
    }
    if (this.levelUser === 'custom' && this.minesUser == 0) {
      // Error
    }
    return leves[this.levelUser];
  }

  setPositionMines(countMines: number) {
    let mines: Mine[] = [];

    for (let i = 0; i < countMines; i++) {
      let col, row;
      do {
        col = Math.floor(Math.random() * this.sizeBoard.cols);
        row = Math.floor(Math.random() * this.sizeBoard.rows);
      } while (this.board[row][col].value == -1);

      this.board[row][col].value = -1;
      mines.push({ col, row });
    }
    return mines;
  }

  setValueCell() {
    this.board.forEach((row, r) => {
      row.forEach((cell, c) => {
        let countNeighbors = 0;

        if (this.board[r][c].value < 0)
          return;

        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (i == 0 && j == 0)
              continue;

            if (this.board[r + i] && this.board[r + i][c + j] && this.board[r + i][c + j].value == -1) {
              countNeighbors++;
            }
          }
        }

        cell.value = countNeighbors;
      })
    });
  }

  onClickCell(cell: Cell, row: number, col: number, event: any) {
    this.minesweeperService.setStatusGame('click');

    if (cell.status === 'H' && event.which === 3) {
      cell.status = 'M';
      this.minesweeperService.setMinesAvailable(this.minesweeperService.getMinesAvailable() - 1);
      return;
    }

    if (cell.status == 'M') {
      cell.status = 'H';
      this.minesweeperService.setMinesAvailable(this.minesweeperService.getMinesAvailable() + 1);
      return
    } else if (cell.status == 'H')
      cell.status = 'S';

    switch (cell.value) {
      case 0:
        this.showArea(row, col);
        break;
      case -1:
        cell.value = -2;
        this.gameOver();
        break;

      default:
        break;
    }
  }

  gameOver() {
    this.board.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (cell.value == -1)
          cell.status = 'S';
      })
    });
    this.minesweeperService.gameOver();
  }

  showArea(row: number, col: number) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        let rowAround = row + i, colAround = col + j
        if (this.board[rowAround] && this.board[rowAround][colAround] && this.board[rowAround][colAround].status == 'H') {
          if (this.board[rowAround][colAround].value == 0) {
            this.board[rowAround][colAround].status = 'S';
            this.showArea(rowAround, colAround);
          } else if (this.board[rowAround][colAround].value > 0)
            this.board[rowAround][colAround].status = 'S';
        }
      }
    }
  }
}
