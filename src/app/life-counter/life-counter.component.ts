import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-life-counter',
  templateUrl: './life-counter.component.html',
  styleUrls: ['./life-counter.component.css']
})
export class LifeCounterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  topImages = [
    { src: "/sorceryLife/assets/pictures/air_element.jpg"},
    { src: "/sorceryLife/assets/pictures/earth_element.jpg"},
    { src: "/sorceryLife/assets/pictures/fire_element.jpg" },
    { src: "/sorceryLife/assets/pictures/water_element.jpg" },
    { src: "/sorceryLife/assets/pictures/mana.png"}
  ];
  bottomImages = [
    { src: "/sorceryLife/assets/pictures/air_element.jpg"},
    { src: "/sorceryLife/assets/pictures/earth_element.jpg"},
    { src: "/sorceryLife/assets/pictures/fire_element.jpg" },
    { src: "/sorceryLife/assets/pictures/water_element.jpg" },
    { src: "/sorceryLife/assets/pictures/mana.png"}
  ];
  counts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  topLife:number = 20;
  bottomLife:number = 20;

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
    if (side==="top"){
      this.topLife = this.evaluateInvertedStat(y, rect.height, this.topLife);
    }
    else{
      this.bottomLife = this.evaluateStat(y, rect.height, this.bottomLife);
    }
  }

  evaluateStat(y: number, rect: number, stat: number):number{
    if (y<rect/2){
      return Math.min(stat + 1, 20);
    } else {
      return Math.max(stat - 1, 0);
    }
  }

  evaluateInvertedStat(y: number, rect: number, stat: number):number{
    if (y<rect/2){
      return Math.max(stat - 1, 0);
    } else {
      return Math.min(stat + 1, 20);
    }
  }

}
