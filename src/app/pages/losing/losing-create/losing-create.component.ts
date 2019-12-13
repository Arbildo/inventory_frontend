import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ProductDetailService} from '../../product/Utils/Services/product-detail.service';
import {ProductLoseService} from '../Utils/Service/product-lose.service';


@Component({
  selector: 'ngx-report-create',
  templateUrl: './losing-create.component.html',
  styleUrls: ['./losing-create.component.scss'],
})
export class LosingCreateComponent {
  productLoseForm;
  productDetailList;
  constructor(
    private formBuilder: FormBuilder,
    private productDetailService: ProductDetailService,
    private productLoseService: ProductLoseService,
  ) {
    this.productLoseForm = this.formBuilder.group({
      idProductoDetalle: '',
      cantidad: '',
      descripcion: '',
    });
  this.populateForm();
  }
  private populateForm() {
    this.getProductDetailList();
  }
  private getProductDetailList() {
    const params = {};
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
  public onSaveForm(productLoseForm) {
    const ESTADO_PENDIENTE = 1;
    const data = {
      idDetalleProducto: productLoseForm.idProductoDetalle,
      cantidad: productLoseForm.cantidad,
      descripcion: productLoseForm.descripcion,
      estado: ESTADO_PENDIENTE,
    };
    this.productLoseService.createProductLoseEntry(data).then(value => console.log(this.productLoseForm.reset()));
  }

}
