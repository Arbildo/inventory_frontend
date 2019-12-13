import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ProductDetailService} from '../../Utils/Services/product-detail.service';
import {LoteService} from '../../Utils/Services/lote.service';
import {State} from '../../../../__entities/ProductDetail';
import {Lote} from '../../../../__entities/Lote';

@Component({
  selector: 'ngx-edit-input-modal',
  templateUrl: './edit-input-modal.component.html',
  styleUrls: ['./edit-input-modal.component.scss'],
})
export class EditInputModalComponent implements OnInit {
  lotsList: Lote[];
  productDetailStates: State[];
  form: FormGroup;
  @Input() public idDetalle;
  constructor(public fb: FormBuilder,
              private productDetailService: ProductDetailService,
              private ngbActiveModal: NgbActiveModal,
              private lotsService: LoteService) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.populateModal(this.idDetalle);
  }

  private buildForm() {
    this.form = this.fb.group({
      id: [{value: '', disabled: true}],
      producto: [{value: '', disabled: true}],
      lote: [{value: '', disabled: false}],
      stockInicial: [{value: '', disabled: false}],
      stockActual: [{value: '', disabled: false}],
      stockMinimo: [{value: '', disabled: false}],
      precio: [{value: '', disabled: false}],
      estado: [{value: '', disabled: false}],
    });
    this.populateLists();
  }

  private populateModal(idProductoDetalle) {
    const params = {
      idProductoDetalle: idProductoDetalle,
    };
    this.productDetailService.getProductDetail(params).subscribe(
      response => {
        this.form.setValue({
          id: response[0].idProductoDetalle,
          producto: response[0].idProducto.nombre,
          lote: response[0].idLote.idLote,
          stockInicial: response[0].stockInicial,
          stockActual: response[0].stockActual,
          stockMinimo: response[0].stockMinimo,
          precio: response[0].precio,
          estado: response[0].estado.id,
        });
      });
  }
  private populateLists() {
    const params = {};
    this.lotsService.getLotesBy(params).subscribe(response => {
      const listStates = [];
      response.forEach((value) => {
        listStates.push({
          idLote: value.idLote,
          nombre: value.nombre,
          estado: value.estado.nombre,
        });
      });
      this.lotsList = listStates;
    });
    this.productDetailService.getProductDetailStates().subscribe(response => {
      const listTypes = [];
      response.forEach((value) => {
        listTypes.push({
          id: value.id,
          nombre: value.nombre,
        });
      });
      this.productDetailStates = listTypes;
    });
  }
  public onSubmit() {
    const newData = {
      id : this.form.controls.id.value,
      stockInicial : this.form.controls.stockInicial.value,
      stockActual : this.form.controls.stockActual.value,
      stockMinimo : this.form.controls.stockMinimo.value,
      idLote : this.form.controls.lote.value,
      precio : this.form.controls.precio.value,
      estado : this.form.controls.estado.value,
    };


    this.productDetailService.editProductDetail(newData);
    this.ngbActiveModal.close();
  }
}
