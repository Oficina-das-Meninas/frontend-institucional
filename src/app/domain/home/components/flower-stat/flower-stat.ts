import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-flower-stat',
  imports: [],
  templateUrl: './flower-stat.html',
  styleUrl: './flower-stat.scss'
})
export class FlowerStat {
  @Input() value!: number;
  @Input() label!: string;
  @Input() flowerColor!: string;
  @Input() valueColor!: string;
}
