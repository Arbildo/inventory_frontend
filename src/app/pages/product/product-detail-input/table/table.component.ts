import {Component} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import {ProductDetailService} from '../../Utils/Services/product-detail.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EditInputModalComponent} from '../edit-input-modal/edit-input-modal.component';
import {FormProductDetailComponent} from '../form-product-detail/form-product-detail.component';

@Component({
  selector: 'ngx-product-output-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {

  settings = {
    columns: {
      id: {
        title: 'Id',
        type: 'text',
        editable: false,
      },
      producto: {
        title: 'Producto',
        type: 'string',
      },
      codigo: {
        title: 'Codigo',
        type: 'string',
      },
      tipo: {
        title: 'Tipo',
        type: 'string',
      },
      lote: {
        title: 'Lote',
        type: 'number',
      },
      stockInicial: {
        title: 'Stock Inicial',
        type: 'string',
      },
      stockActual: {
        title: 'Stock Actual',
        type: 'string',
      },
      stockMinimo: {
        title: 'Stock Mínimo',
        type: 'string',
      },
      precio: {
        title: 'Precio',
        type: 'string',
      },
      estado: {
        title: 'Estado',
        type: 'string',
      },
    },
    actions: false,
  };
  source: LocalDataSource = new LocalDataSource();

  constructor(
    private modalService: NgbModal,
    private service: ProductDetailService,
  ) {
    this.loadTable();
  }
  private loadTable() {
    const params = {};
    this.service.getProductDetail(params).subscribe(
      response => {
        const productList = [];
        response.forEach(function (value) {
          productList.push({
            id: value.idProductoDetalle,
            producto: value.idProducto.nombre,
            codigo: value.idProducto.codigo,
            tipo: value.idProducto.idTipo.nombre,
            lote: value.idLote.idLote,
            stockInicial: value.stockInicial,
            stockActual: value.stockActual,
            stockMinimo: value.stockMinimo,
            precio: value.precio,
            estado: value.estado.nombre,
          });
        });
        this.source.load(productList);
      });
  }

  onUserRowSelect(event) {
    const idDetalle = event.data.id;
    const modalRef = this.modalService.open(EditInputModalComponent);
    modalRef.componentInstance.idDetalle = idDetalle;
  }

  openModalToCreateInput() {
    this.modalService.open(FormProductDetailComponent);
  }
}
