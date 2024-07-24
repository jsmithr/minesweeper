import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Board } from 'src/data/board';
import { Cell } from 'src/data/cell';
import { Mine } from 'src/data/mine';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnChanges {
  @Input() cols: number;
  @Input() rows: number;
  @Input() levelUser: 'easy' | 'medium' | 'hard' | 'custom';
  @Input() minesUser: number = 0;
  board: Cell[][];
  mines: Mine[];
  sizeBoard: { rows: number, cols: number };

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.sizeBoard = this.getSizeBoard();
    this.board = this.generateBoard();
    this.setPositionMines(this.getCountMines());
    this.setValueCell();
  }

  getSizeBoard() {
    const leves = {
      easy: { rows: 8, cols: 8 },
      medium: { rows: 16, cols: 16 },
      hard: { rows: 30, cols: 16 },
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
    this.mines = mines;
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

        this.board[r][c].value = countNeighbors;
      })
    });
  }

  showValueCell(cell: Cell) {
    cell.status = 'S';
    if (cell.value == -1) {
      this.gameOver();
    }
  }

  gameOver() {
    this.board.forEach((row, r) => {
      row.forEach((cell, c) => {
        cell.status = 'S';
      })
    });
  }
}
