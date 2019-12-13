import {Component} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductService } from '../../Utils/Services/product.service';
import {NbDialogService} from '@nebular/theme';
import {ModalComponent} from './modal/modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EditProductModalComponent} from './edit-product-modal/edit-product-modal.component';

@Component({
  selector: 'ngx-product-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
})
export class SmartTableComponent {

  settings = {
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      idProducto: {
        title: 'Id',
        type: 'text',
        editable: false,
      },
      nombre: {
        title: 'Nombre',
        type: 'string',
      },
      descripcion: {
        title: 'Descripción',
        type: 'string',
      },
      unidad: {
        title: 'Unidad',
        type: 'string',
      },
      tipo: {
        title: 'Tipo',
        type: 'string',
      },
      estado: {
        title: 'Estado',
        type: 'number',
      },
    },
    actions: {
      add: false,
      edit: false,
    },
  };
  source: LocalDataSource = new LocalDataSource();

  constructor(
    private service: ProductService,
    private nbService: NbDialogService,
    private modalService: NgbModal,
  ) {
    this.loadTableData();
  }

  private loadTableData() {
    this.service.getActiveProducts().subscribe(
      response => {
        const productList = [];
        response.forEach(function (value) {
          productList.push({
            idProducto: value.idProducto,
            codigo: value.codigo,
            nombre: value.nombre.toUpperCase(),
            descripcion: value.descripcion.toUpperCase(),
            tipo: value.idTipo.nombre,
            unidad: value.idUnidad.nombre,
            estado: value.estado.estado,
          });
        });
        this.source.load(productList);
      });
  }
  /**
   *
   * @param event
   */
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.service.disableProduct(event.data);
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  /**
   *
   * @param event
   */
  onEditConfirm(event): void {
    if (window.confirm('Confirmar')) {
      const oldData = event.data;
      const newData = event.newData;
      if (oldData !== newData) {
        this.service.editProduct(newData);
      }
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
  public onUserRowSelect(event) {
    const idProducto = event.data.idProducto;
    const modalRef = this.modalService.open(EditProductModalComponent);
    modalRef.componentInstance.idProduct = idProducto;
  }
  /**
   *
   */
  open() {
    this.modalService.open(ModalComponent);
  }
}
