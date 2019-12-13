import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {LoteService} from '../../Utils/Services/lote.service';
import {State} from '../../../../__entities/Lote';

@Component({
  selector: 'ngx-edit-lot',
  templateUrl: './edit-lot.component.html',
  styleUrls: ['./edit-lot.component.scss'],
})
export class EditLotComponent implements OnInit {
  @Input() public idLot;
  form: FormGroup;
  loteStates: State[];
  date: any;
  constructor(public fb: FormBuilder,
              private loteService: LoteService,
              private ngbActiveModal: NgbActiveModal) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.populateModal(this.idLot);
  }

  private buildForm() {
    this.form = this.fb.group({
      idLote: [{value: '', disabled: true}],
      nombre: [{value: '', disabled: false}],
      fechaCreacion: [{value: '', disabled: true}],
      fechaVencimiento: [{value: '', disabled: false}],
      estado: [{value: '', disabled: false}],
    });
    this.populateLists();
  }

  private populateModal(idLote) {
    const params = {
      idLote: idLote,
    };
    this.loteService.getLotesBy(params).subscribe(
      response => {
        function f(date) {
          return {
            year: +date[0],
            month: +date[1],
            day: +date[2],
          };
        }
        this.form.setValue({
          idLote: response[0].idLote,
          nombre: response[0].nombre,
          fechaCreacion: f(response[0].fechaCreacion.split('-', 3)),
          fechaVencimiento: f(response[0].fechaVencimiento.split('-', 3)),
          estado: response[0].estado.id,
        });
      });
  }


  private populateLists() {
    this.loteService.getLoteStates().subscribe(response => {
      const listStates = [];
      response.forEach((value) => {
        listStates.push({
          id: value.id,
          nombre: value.nombre,
        });
      });
      this.loteStates = listStates;
    });

  }
  public onSubmit() {
    function f(date) {
      if (date.year === 0) {
        return '';
      }
       return date.year + '-' + date.month + '-' + date.day;
    }
    const newData = {
      idLote : this.form.controls.idLote.value,
      nombre : this.form.controls.nombre.value,
      estado : this.form.controls.estado.value,
      fechaVencimiento: f(this.form.controls.fechaVencimiento.value),
    };
    this.loteService.updateLot(newData);
    this.ngbActiveModal.close();
  }
}
