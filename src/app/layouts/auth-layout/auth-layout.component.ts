import {animate, transition, trigger} from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css'],
  animations: [
    trigger('animation', [
      transition('closed => open', [
        animate('0.5s')
      ]),
      transition('open => closed', [
        animate('0.5s')
      ]),
    ])
  ]
})
export class AuthLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
