import { Component } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalInputComponent} from './modal-input/modal-input.component';

@Component({
  selector: 'ngx-lot',
  templateUrl: './lot.component.html',
  styleUrls: ['./lot.component.scss'],
})
export class LotComponent {

  constructor(private ngModalService: NgbModal) { }

  openModal() {
    this.ngModalService.open(ModalInputComponent);
  }
}
