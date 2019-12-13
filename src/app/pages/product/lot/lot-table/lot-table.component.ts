import { Component } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {LoteService} from '../../Utils/Services/lote.service';
import {EditProductModalComponent} from '../../product/smart-table/edit-product-modal/edit-product-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EditLotComponent} from '../edit-lot/edit-lot.component';

@Component({
  selector: 'ngx-lot-table',
  templateUrl: './lot-table.component.html',
  styleUrls: ['./lot-table.component.scss'],
})



export class LotTableComponent {
  settings = {
    columns: {
      id: {
        title: 'Id',
        type: 'text',
        editable: false,
      },
      nombre: {
        title: 'Producto',
        type: 'string',
      },
      fechaCreacion: {
        title: 'Fecha de creación',
        type: 'string',
      },
      fechaDeBaja: {
        title: 'Fecha de baja',
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

  constructor(private loteService: LoteService,
              private modalService: NgbModal,
  ) {
    this.loadTableData();
  }

  private loadTableData() {
    const params = {};
    this.loteService.getLotesBy(params).subscribe(
      response => {
        const list = [];
        response.forEach(function (value) {
          list.push({
            id: value.idLote,
            nombre: value.nombre,
            fechaCreacion: value.fechaCreacion,
            fechaDeBaja: value.fechaVencimiento,
            estado: value.estado.nombre,
          });
        });
        this.source.load(list);
      });
  }

  public onUserRowSelect(event) {
    const idLote = event.data.id;
    const modalRef = this.modalService.open(EditLotComponent);
    modalRef.componentInstance.idLot = idLote;
  }

}
