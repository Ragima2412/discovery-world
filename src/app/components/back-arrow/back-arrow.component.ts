import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-back-arrow',
  templateUrl: './back-arrow.component.html',
  styleUrls: ['./back-arrow.component.scss']
})
export class BackArrowComponent implements OnInit {
 
  @Input()
  public link = '';

  @Input()
  public position = false;
  
  constructor() { }

  ngOnInit(): void {
  }

}
