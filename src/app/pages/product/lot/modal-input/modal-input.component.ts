import { Component } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {LoteService} from '../../Utils/Services/lote.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-modal-input',
  templateUrl: './modal-input.component.html',
  styleUrls: ['./modal-input.component.scss'],
})
export class ModalInputComponent {
  lotForm;
  constructor(
    private formBuilder: FormBuilder,
    private loteRestService: LoteService,
    private ngbActiveModalService: NgbActiveModal,
  ) {
    this.lotForm = this.formBuilder.group({
      nombre: '',
    });
  }

  public saveForm(form) {
    const ACTIVE_STATE = 1;
    const data = {
      nombre: form.nombre,
      estado : ACTIVE_STATE,
    };
    this.loteRestService.createLot(data);
    this.ngbActiveModalService.close();
  }
}
