import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ProductOutputService} from '../../../Utils/Services/product-output.service';

@Component({
  selector: 'ngx-output-list-detail-modal',
  templateUrl: './output-list-detail-modal.component.html',
  styleUrls: ['./output-list-detail-modal.component.scss'],
})
export class OutputListDetailModalComponent implements OnInit {
  form: FormGroup;
  detailPedido: {
    idDetallePedido,
    producto,
    cantidad,
    precio,
  }[] = [];
  @Input() public idPedido;

  constructor(public fb: FormBuilder,
              private pedidoService: ProductOutputService) {
    this.buildForm();
  }
  ngOnInit() {
    this.populateForm();
    this.populateTable();
  }


  private buildForm() {
    this.form = this.fb.group({
      idPedido: [{value: '', disabled: true}],
      fechaPedido: [{value: '', disabled: true}],
      nombre: [{value: '', disabled: true}],
      total: [{value: '', disabled: true}],
    });
  }

  private populateForm() {
    const params = {
      idPedido: this.idPedido,
    };
    this.pedidoService.getPedidos(params).subscribe(response => {
      response.forEach((value) => {
        this.form.setValue({
          idPedido: value.idPedido,
          fechaPedido: value.fechaPedido,
          nombre: value.idCliente.nombre + ' - ' + value.idCliente.numeroDoc,
          total: value.total,
        });
      });
    });
  }
  private populateTable() {
    const params = {
      idPedido: this.idPedido,
    };
    this.pedidoService.getDetailsBy(params).subscribe(response => {
      response.forEach((value => {
        this.detailPedido.push({
          idDetallePedido: value.idDetallePedido,
          producto: value.idProductoDetalle.idProducto.nombre,
          cantidad: value.cantidad,
          precio: value.precio,
        });
      }));
    });
  }
}
