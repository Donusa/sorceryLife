import { Component, OnInit, ElementRef} from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-life-counter',
  templateUrl: './life-counter.component.html',
  styleUrls: ['./life-counter.component.css']
})
export class LifeCounterComponent implements OnInit {

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    document.addEventListener('contextmenu', this.disableContextMenu);
  }

  leftImages = [
    { src: environment.baseHref + "assets/pictures/air_element.jpg" },
    { src: environment.baseHref + "assets/pictures/earth_element.jpg" },
  ];
  rightImages = [
    { src: environment.baseHref + "assets/pictures/fire_element.jpg" },
    { src: environment.baseHref + "assets/pictures/water_element.jpg" },
  ];

  counts = [0, 0, 0, 0, 0, 0, 0, 0];
  topLife: number = 20;
  bottomLife: number = 20;
  topMana: number = 0;
  bottomMana: number = 0;
  baseHref = environment.baseHref;
  lossVisible: boolean = false;
  lossVisible2: boolean = false;
  timeoutTimer: number = 3000;
  timer: any;
  totalLifeLost: number = 0;
  totalLifeLost2: number = 0;
  activePlayer: 'top' | 'bottom' | null = null;
  showDiceModal: boolean = false;
  diceResult: number | null = null;
  diceOptions = [4, 6, 8, 10, 20];

  disableContextMenu(event: MouseEvent):void{
    event.preventDefault();
  }

  handleClick(index: number, event: MouseEvent) {
    const imageElement = event.target as HTMLElement;
    const rect = imageElement.getBoundingClientRect();
    const y = event.clientY - rect.top;

    this.counts[index] = this.evaluateStat(y, rect.height, this.counts[index]);
  }

  handleInvertedClick(index: number, event: MouseEvent) {
    const imageElement = event.target as HTMLElement;
    const rect = imageElement.getBoundingClientRect();
    const y = event.clientY - rect.top;

    this.counts[index] = this.evaluateInvertedStat(y, rect.height, this.counts[index]);
  }

  handleLife(side: string, event: MouseEvent) {
    const imageElement = event.target as HTMLElement;
    const rect = imageElement.getBoundingClientRect();
    const y = event.clientY - rect.top;
    if((this.isInRange(side,(y<rect.height/2)?-1:+1)))
      {
        this.showLoss((y<rect.height/2)?-1:+1,side);
      }
    if (side === "top") {
      this.topLife = this.evaluateInvertedStat(y, rect.height, this.topLife);
    }
    else if(side !== "top"){
      this.bottomLife = this.evaluateStat(y, rect.height, this.bottomLife);
    }
  }

  evaluateStat(y: number, rect: number, stat: number): number {
    if (y < rect / 2) {
      return Math.min(stat + 1, 20);
    }
    return Math.max(stat - 1, 0);
  }

  evaluateInvertedStat(y: number, rect: number, stat: number): number {
    if (y < rect / 2) {
      return Math.max(stat - 1, 0);
    }
    return Math.min(stat + 1, 20);
  }

  showLoss(modification: number, side: string) {
      
      if (side === "top") {
        this.totalLifeLost2+=modification;
        this.lossVisible2 = true;
      }
      else if (side!=="top"){
        this.lossVisible = true;
        this.totalLifeLost-=modification;
      }

      if(this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.lossVisible = false;
        this.lossVisible2 = false;
        this.totalLifeLost = 0;
        this.totalLifeLost2 = 0;
      }, 1500);
    }

    isInRange(side: string, modification: number):boolean{
      return(
        (this.bottomLife-modification>=0 
          && this.bottomLife-modification<=20 
          && side!=='top')
        ||
        (this.topLife+modification>=0 
          && this.topLife+modification<=20 
          && side==='top')
      );
    }

    toggleActivePlayer() {
      if (!this.activePlayer) {
        this.activePlayer = Math.random() < 0.5 ? 'top' : 'bottom';
      } else {
        this.activePlayer = this.activePlayer === 'top' ? 'bottom' : 'top';
      }
    }

    toggleDiceModal() {
      this.showDiceModal = !this.showDiceModal;
    }

    rollDice(faces: number) {
      this.diceResult = Math.floor(Math.random() * faces) + 1;
      setTimeout(() => {
        this.diceResult = null;
        this.showDiceModal = false;
      }, 2000);
    }

}

