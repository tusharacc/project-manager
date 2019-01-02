import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() sourceData:string;
  @Input() inputData:Array<string>;
  @Output() selectedValue: EventEmitter<any> = new EventEmitter();


  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  selectValue(val){
    this.selectedValue.emit(val);
    this.activeModal.close('Close click');
  }

}
