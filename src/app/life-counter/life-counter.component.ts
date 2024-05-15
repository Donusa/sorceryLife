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
    { src: "../../assets/pictures/air_element.jpg"},
    { src: "../../assets/pictures/earth_element.jpg"},
    { src: "../../assets/pictures/fire_element.jpg" },
    { src: "../../assets/pictures/water_element.jpg" }
  ];
  bottomImages = [
    { src: "../../assets/pictures/air_element.jpg"},
    { src: "../../assets/pictures/earth_element.jpg"},
    { src: "../../assets/pictures/fire_element.jpg" },
    { src: "../../assets/pictures/water_element.jpg" }
  ];
  counts = [0, 0, 0, 0, 0, 0, 0, 0];

  handleClick(index: number, event: MouseEvent) {
    const imageElement = event.target as HTMLElement;
    const rect = imageElement.getBoundingClientRect();
    const y = event.clientY - rect.top;
    
    if (y < rect.height / 2) {
      this.counts[index]++;
    } else {
      this.counts[index]--;
    }
  }

}
