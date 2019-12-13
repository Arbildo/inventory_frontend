import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ProductDetailService} from '../../Utils/Services/product-detail.service';
import {ClientsService} from '../../../clients/clients.service';
import {ProductOutputService} from '../../Utils/Services/product-output.service';


@Component({
  selector: 'ngx-product-detail-output',
  templateUrl: './product-detail-output.component.html',
  styleUrls: ['./product-detail-output.component.scss'],
})
export class ProductDetailOutputComponent {
  formOutputProduct: FormGroup;
  formOutputClient: FormGroup;
  productDetailList;
  clientList;
  total: number = 0.0;
  cliente: '';
  productBuying = [];

  constructor(private formBuilder: FormBuilder,
              private productDetailService: ProductDetailService,
              private clientsService: ClientsService,
              private productOutputRestService: ProductOutputService) {
    this.buildFormProducts();
    this.buildFormClients();
    this.populateSelectProductDetail();
    this.populateClients();
  }

  private buildFormProducts() {
    this.formOutputProduct = this.formBuilder.group({
      id: [{value: '', disabled: true}],
      nombreProducto: [{value: '', disabled: true}],
      lote: [{value: '', disabled: true}],
      stockInicial: [{value: '', disabled: true}],
      stockActual: [{value: '', disabled: true}],
      cantidad: [{value: '', disabled: false}],
      precio: [{value: '', disabled: true}],
      idProductoDetalle: [''],
    }, {updateOn: 'change'});
  }

  private buildFormClients() {
    this.formOutputClient = this.formBuilder.group({
      idCliente: '',
      ndocumento: [''],
      direccion: [{value: '', disabled: true}],
      telefono: [{value: '', disabled: true}],
    }, {updateOn: 'change'});
  }

  private populateSelectProductDetail() {
    const params = {
      estado: 1,
    };
    this.productDetailService.getProductDetail(params).subscribe(
      response => {
        const list = [];
        response.forEach(function (value) {
          list.push({
            idProductoDetalle: value.idProductoDetalle,
            nombre: value.idProducto.nombre,
          });
        });
        this.productDetailList = list;
      });
  }

  private populateClients() {
    const params = {
      estado: 1,
    };
    this.clientsService.getClientsBy(params).subscribe(
      response => {
        const list = [];
        response.forEach(function (value) {
          list.push({
            idCliente: value.idCliente,
            ndocumento: value.numeroDoc,
            telefono: value.telefono,
            nombre: value.nombre.toLocaleUpperCase(),
          });
        });
        this.clientList = list;
      });
  }

   populateProductDetails(event) {
    const id = event.target.value;
    const params = {
      idProductoDetalle: id,
    };
    this.productDetailService.getProductDetail(params).subscribe(
      response => {
        const list = {
          id: response[0].idProducto.idProducto,
          idProductoDetalle: response[0].idProductoDetalle,
          nombreProducto: response[0].idProducto.nombre,
          lote: response[0].idLote.idLote,
          stockInicial: response[0].stockInicial,
          stockActual: response[0].stockActual,
          precio: response[0].precio,
        };
        this.populateInputs(list);
      });
  }

  private populateInputs(list) {
    this.formOutputProduct.setValue({
      id: list.id,
      nombreProducto: list.nombreProducto,
      lote: list.lote,
      stockInicial: list.stockInicial,
      stockActual: list.stockActual,
      cantidad: null,
      precio: list.precio,
      idProductoDetalle: list.idProductoDetalle,
    });
  }

  public onEnterClient(id) {
    const params = {
      numeroDoc: id,
    };
    this.clientsService.getClientsBy(params).subscribe(
      response => {
        const list = {
          idCliente: response[0].idCliente,
          documento: response[0].numeroDoc,
          direccion: response[0].direccion,
          telefono: response[0].telefono,
        };
        this.populateClientsInputs(list);
      });
  }

  private populateClientsInputs(list) {
    this.formOutputClient.setValue({
      idCliente: list.idCliente,
      ndocumento: list.documento,
      direccion: list.direccion,
      telefono: list.telefono,
    });
  }

  addDetail() {
    const costo = ProductDetailOutputComponent.getTotalPrice(this.formOutputProduct.controls.precio.value,
      this.formOutputProduct.controls.cantidad.value);
    this.cliente = this.formOutputClient.controls.idCliente.value;
    this.productBuying.push({
      idDetalleProducto: this.formOutputProduct.controls.idProductoDetalle.value,
      producto: this.formOutputProduct.controls.nombreProducto.value,
      cliente: this.formOutputClient.controls.ndocumento.value,
      cantidad: this.formOutputProduct.controls.cantidad.value,
      costo: costo,
    });
    this.total = this.total + costo;
  }

  static getTotalPrice(precio, cantidad) {
    return precio * cantidad;
  }

  public onBuying() {
    const detail = this.formatProductDetail(this.productBuying);
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const data = {
      idCliente: this.cliente,
      idEncargado: currentUser.idUsuario,
      estado: 1,
      compra: detail,
      total: this.total,
    };
    this.productOutputRestService.makeBuying(data);
  }

  private formatProductDetail(productDetail) {
    const readyForSave = [];
    for (const detail of productDetail) {
      readyForSave.push({
        idDetalleProducto: detail.idDetalleProducto,
        cantidad: detail.cantidad,
        precio: detail.costo,
        estado: 1,
      });
    }
    return readyForSave;
  }
}
