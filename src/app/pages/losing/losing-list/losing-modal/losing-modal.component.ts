import {Component, Input, OnInit} from '@angular/core';
import {ProductLoseService} from '../../Utils/Service/product-lose.service';
import {FormBuilder, FormGroup } from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-report-modal',
  templateUrl: './losing-modal.component.html',
  styleUrls: ['./losing-modal.component.scss'],
})

export class LosingModalComponent implements OnInit {
  form: FormGroup;
  @Input() public idRegister;
  constructor(public fb: FormBuilder,
    private productLoseService: ProductLoseService,
              private ngbActiveModal: NgbActiveModal) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.populateModal(this.idRegister);
  }

  private buildForm() {
    this.form = this.fb.group({
      id: [{value: '', disabled: true}],
      codigoPerdida: [{value: '', disabled: true}],
      fecha: [{value: '', disabled: true}],
      cantidad: [{value: '', disabled: true}],
      descripcion: [{value: '', disabled: true}],
      detalleProducto: [{value: '', disabled: true}],
      producto: [{value: '', disabled: true}],
      lote: [{value: '', disabled: true}],
      precio: [{value: '', disabled: true}],
      estado: [{value: '', disabled: true}],
    });
  }

  private populateModal(idRegister) {
    const params = {
      idPerdida: idRegister,
    };
     this.productLoseService.getProductLose(params).subscribe(
      response => {
        const list = {
              id: response[0].idPerdida,
              codigoPerdida: response[0].codigo,
              fecha: response[0].fecha,
              cantidad: response[0].cantidad,
              descripcion: response[0].descripcion,
              detalleProducto: response[0].idDetalleProducto.idProductoDetalle,
              producto: response[0].idDetalleProducto.idProducto.nombre,
              lote: response[0].idDetalleProducto.idLote.idLote + ' - ' + response[0].idDetalleProducto.idLote.nombre,
              precio: response[0].idDetalleProducto.precio,
              estado: response[0].estado.nombre,
        };
        this.populateInputs(list);
      });
  }
  private populateInputs(list) {
    this.form.setValue({
      id: list.id,
      codigoPerdida: list.codigoPerdida,
      fecha: list.fecha,
      cantidad: list.cantidad,
      descripcion: list.descripcion,
      detalleProducto: list.detalleProducto,
      producto: list.producto,
      lote: list.lote,
      precio: list.precio,
      estado: list.estado,
    });
  }
public onSubmit() {
    const idRow = this.form.controls['id'].value;
    const APROVED_STATE = 2;
  if (window.confirm('¿Aprueba el siguiente reporte de pérdida?')) {
    const params = {
      estado : APROVED_STATE,
    };
    this.productLoseService.updateProductLoseRegister(idRow, params);
    this.ngbActiveModal.close();
  } else {

  }
}
}
