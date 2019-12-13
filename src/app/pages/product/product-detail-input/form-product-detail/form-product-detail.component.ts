import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ProductService} from '../../Utils/Services/product.service';
import {LoteService} from '../../Utils/Services/lote.service';
import {ProductDetailService} from '../../Utils/Services/product-detail.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-form-product-detail',
  templateUrl: './form-product-detail.component.html',
  styleUrls: ['./form-product-detail.component.scss'],
})

export class FormProductDetailComponent {
  productList;
  loteList;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private loteService: LoteService,
    private productDetailService: ProductDetailService,
    private modalService: NgbModal,
  ) {
    this.form = this.formBuilder.group({
      idProducto: '',
      idLote: '',
      stockInicial: '',
      stockMinimo: '',
      precio: '',
    });
    this.populateForm();
  }
    private populateForm() {
    this.getProductList();
    this.getLoteList();
  }

  private getLoteList() {
    const params = {};
    this.loteService.getLotesBy(params).subscribe(
      response => {
        const list = [];
        response.forEach(function (value) {
          list.push({
            idLote: value.idLote,
            nombre: value.nombre,
            estado: value.estado.nombre,
          });
        });
        this.loteList = list;
      });

  }
  private getProductList() {
    this.productService.getActiveProducts().subscribe(
      response => {
        const list = [];
        response.forEach(function (value) {
          list.push({
            idProducto: value.idProducto,
            nombre: value.nombre,
            estado: value.estado.estado,
          });
        });
        this.productList = list;
      });
  }

  saveForm() {
    const ESTADO_ACTIVO = 1;
    const data = {
    idLote: this.form.controls.idLote.value,
    precio: this.form.controls.precio.value,
    idProducto: this.form.controls.idProducto.value,
    stockInicial: this.form.controls.stockInicial.value,
    stockActual: this.form.controls.stockInicial.value,
    stockMinimo: this.form.controls.stockMinimo.value,
    estado: ESTADO_ACTIVO,
    };
    this.productDetailService.createProductDetail(data);
    this.modalService.dismissAll();
  }
}
