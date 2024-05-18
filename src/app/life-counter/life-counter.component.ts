import { Component, OnInit, ElementRef } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-life-counter',
  templateUrl: './life-counter.component.html',
  styleUrls: ['./life-counter.component.css']
})
export class LifeCounterComponent implements OnInit {

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
  }

  topImages = [
    { src: environment.baseHref + "assets/pictures/air_element.jpg" },
    { src: environment.baseHref + "assets/pictures/earth_element.jpg" },
    { src: environment.baseHref + "assets/pictures/fire_element.jpg" },
    { src: environment.baseHref + "assets/pictures/water_element.jpg" },
    { src: environment.baseHref + "assets/pictures/mana.png" }
  ];
  bottomImages = [
    { src: environment.baseHref + "assets/pictures/air_element.jpg" },
    { src: environment.baseHref + "assets/pictures/earth_element.jpg" },
    { src: environment.baseHref + "assets/pictures/fire_element.jpg" },
    { src: environment.baseHref + "assets/pictures/water_element.jpg" },
    { src: environment.baseHref + "assets/pictures/mana.png" }
  ];

  counts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  topLife: number = 20;
  bottomLife: number = 20;
  baseHref = environment.baseHref;
  lossVisible: boolean = false;
  timeoutTimer: number = 3000;
  timer: any;
  totalLifeLost: number = 0;
  totalLifeLost2: number = 0;

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
    if (side === "top") {
      this.topLife = this.evaluateInvertedStat(y, rect.height, this.topLife);
      this.showLoss((y<rect.height/2)?-1:+1,side);
    }
    else if(side !== "top"){
      this.showLoss((y<rect.height/2)?-1:+1,side);
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
      this.lossVisible = true;
      
      if (side === "top") {
        this.elementRef.nativeElement.querySelector('.floating-text').style.transform = 'rotate(180deg)';
        this.totalLifeLost+=modification;
      }
      else{
        this.elementRef.nativeElement.querySelector('.floating-text').style.transform = 'rotate(0deg)';
        this.totalLifeLost-=modification;
      }

      if(this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.lossVisible = false;
        this.totalLifeLost = 0;
      }, 1500);
  }
}

