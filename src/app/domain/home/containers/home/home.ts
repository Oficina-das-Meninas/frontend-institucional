import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FlowerStat } from "../../components/flower-stat/flower-stat";
import { SupportCard } from "../../components/support-card/support-card";
import { CarouselComponent } from "../../../../shared/components/carousel/carousel";

@Component({
  selector: 'app-home',
  imports: [MatButtonModule, MatCardModule, FlowerStat, SupportCard, CarouselComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  yearOfFoundation = new Date('03-23-2002').getFullYear();
  today = new Date().getFullYear();
}
