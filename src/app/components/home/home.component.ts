import { Component } from '@angular/core';
import { Parte1Component } from './parte1/parte1.component';
import { Slider1Component } from './slider1/slider1.component';

@Component({
  selector: 'app-home',
  imports: [Parte1Component, Slider1Component],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
