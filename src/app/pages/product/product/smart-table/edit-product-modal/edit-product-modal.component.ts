import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ProductService} from '../../../Utils/Services/product.service';
import {ProductoEstado} from '../../../../../__entities/product';
import {ProductTypeService} from '../../../Utils/Services/product-type.service';
import {ProductType} from '../../../../../__entities/product-type';

@Component({
  selector: 'ngx-edit-product-modal',
  templateUrl: './edit-product-modal.component.html',
  styleUrls: ['./edit-product-modal.component.scss'],
})
export class EditProductModalComponent implements OnInit {


  productTypes: ProductType[];
  productStates: ProductoEstado[];
  form: FormGroup;
  @Input() public idProduct;
  constructor(public fb: FormBuilder,
              private productService: ProductService,
              private productTipoService: ProductTypeService,
              private ngbActiveModal: NgbActiveModal) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.populateModal(this.idProduct);
  }

  private buildForm() {
    this.form = this.fb.group({
      idProducto: [{value: '', disabled: true}],
      nombre: [{value: '', disabled: false}],
      codigo: [{value: '', disabled: true}],
      descripcion: [{value: '', disabled: false}],
      estado: [{value: '', disabled: false}],
      tipo: [{value: '', disabled: false}],
      unidad: [{value: '', disabled: true}],
    });
    this.populateLists();
  }

  private populateModal(idProducto) {
    const params = {
      idProducto: idProducto,
    };
    this.productService.getProductBy(params).subscribe(
      response => {
        this.form.setValue({
          idProducto: response[0].idProducto,
          nombre: response[0].nombre,
          codigo: response[0].codigo,
          descripcion: response[0].descripcion,
          estado: response[0].estado.idEstado,
          tipo: response[0].idTipo.idTipo,
          unidad: response[0].idUnidad.nombre,
        });
      });
  }
  private populateLists() {
    this.productService.getProductStateList().subscribe(response => {
      const listStates = [];
      response.forEach((value) => {
        listStates.push({
          idEstado: value.idEstado,
          estado: value.estado,
        });
      });
      this.productStates = listStates;
    });
    this.productTipoService.getActiveProductTypes().subscribe(response => {
      const listTypes = [];
      response.forEach((value) => {
        listTypes.push({
          idTipo: value.idTipo,
          nombre: value.nombre,
        });
      });
      this.productTypes = listTypes;
    });
  }
  public onSubmit() {
    const newData = {
      idProducto : this.form.controls.idProducto.value,
      nombre : this.form.controls.nombre.value,
      codigo : this.form.controls.codigo.value,
      descripcion : this.form.controls.descripcion.value,
      estado : this.form.controls.estado.value,
      tipo : this.form.controls.tipo.value,
      unidad : 1,
  };
    this.productService.editProduct(newData);
    this.ngbActiveModal.close();
  }
}
