import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { MinesweeperService } from 'src/domain/services/minesweeper/minesweeper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Minesweeper';
  levelList: any[] = [
    { code: 'easy', text: 'Fácil' },
    { code: 'medium', text: 'Medio' },
    { code: 'hard', text: 'Experto' },
    { code: 'custom', text: 'Personalizado' }
  ];
  level: any = this.levelList[0];

  constructor(private primengConfig: PrimeNGConfig, private minesweeperService: MinesweeperService) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.minesweeperService.initGame();
  }

  setLevel(levelSelected: any) {
    this.minesweeperService.setLevel(levelSelected.code);
    this.minesweeperService.setStatusGame('normal');
  }
}
