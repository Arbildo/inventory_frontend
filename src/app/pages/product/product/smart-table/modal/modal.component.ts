import { Component } from '@angular/core';
import {ProductTypeService} from '../../../Utils/Services/product-type.service';
import {FormBuilder} from '@angular/forms';
import {ProductService} from '../../../Utils/Services/product.service';

@Component({
  selector: 'ngx-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  productForm;
  productTypeList;

  constructor(private productTypeService: ProductTypeService,
              private formBuilder: FormBuilder,
              private productService: ProductService) {
    this.productForm = this.formBuilder.group({
      nombre: '',
      descripcion: '',
      tipo: '',
    });
    this.populateComboType();

  }

  saveForm(productForm) {
    const data = {
      descripcion: productForm.descripcion,
      nombre: productForm.nombre,
      idTipo: productForm.tipo,
      idUnidad: 1,
      estado: 1,
      codigo: '-',
    };
    this.productService.createProduct(data);

  }

  private populateComboType() {
    this.productTypeService.getActiveProductTypes().subscribe(
      response => {
        const list = [];
        response.forEach(function (value) {
          list.push({
            idTipo: value.idTipo,
            nombre: value.nombre,
          });
        });
        this.productTypeList = list;
      });
  }
}

