import { Component, OnInit , Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {

  @Input() item!: any  ;
  @Input() item1 = '';
 
  
  constructor() { }

  ngOnInit(): void {
    console.log(this.item)
  }

}
