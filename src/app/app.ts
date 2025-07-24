import { Component } from '@angular/core';
import { Header } from './header/header';
import { FooterComponent } from './footer/footer';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})


export class App {

}
