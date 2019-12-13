import {Component} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {ProductLoseService} from '../Utils/Service/product-lose.service';
import {LosingModalComponent} from './losing-modal/losing-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PdfBuilderService} from '../../reports/utils/services/pdf-builder.service';

@Component({
  selector: 'ngx-report-list',
  templateUrl: './losing-list.component.html',
  styleUrls: ['./losing-list.component.scss'],
})
export class LosingListComponent {
  list = [];
  selected = null;
  settings = {
    columns: {
      id: {
        title: 'Id',
        type: 'text',
        editable: false,
      },
      codigoPerdida: {
        title: 'Codigo pérdida',
        type: 'text',
      },
      fecha: {
        title: 'Fecha',
        type: 'text',
      },
      cantidad: {
        title: 'Cantidad reportada',
        type: 'string',
      },
      descripcion: {
        title: 'Descripción',
        type: 'string',
      },
      detalleProducto: {
        title: 'Id detalle Producto',
        type: 'string',
      },
      producto: {
        title: 'Producto',
        type: 'string',
      },
      lote: {
        title: 'Lote',
        type: 'number',
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
  form: FormGroup;
  datesforReport: {date}[] = [];
  private body;
  constructor(
              private productLoseService: ProductLoseService,
              private modalService: NgbModal,
              private fb: FormBuilder,
              private pdfBuilderService: PdfBuilderService) {
   this.populateTable();
   this.populateSelectForReport();
  }
  populateSelectForReport() {
    this.form = this.fb.group({
      date: '',
    });
    this.productLoseService.getDatesForReport().subscribe(response => {
      response.forEach((value) => {
        this.datesforReport.push({
          date : value,
        });
      });
    });
  }

private populateTable() {
  const params = {};
  this.productLoseService.getProductLose(params).subscribe(
    response => {
      response.forEach((value) => {
        this.list.push({
          id: value.idPerdida,
          codigoPerdida: value.codigo,
          fecha: value.fecha,
          cantidad: value.cantidad,
          descripcion: value.descripcion,
          detalleProducto: value.idDetalleProducto.idProductoDetalle,
          producto: value.idDetalleProducto.idProducto.nombre,
          lote: value.idDetalleProducto.idLote.idLote,
          precio: value.idDetalleProducto.precio,
          estado: value.estado.nombre,
        });
      });
      this.source.load(this.list);
    });
}

public onUserRowSelect(event) {
    const idRegister = event.data.id;
    this.selected = idRegister;
    const modalRef = this.modalService.open(LosingModalComponent);
    modalRef.componentInstance.idRegister = idRegister;
}

  onReportClick() {
    const params = {
      fecha: this.form.controls.date.value,
    };
    this.productLoseService.getPerdidasForReport(params).subscribe(response => {
      this.body = [LosingListComponent.buildTableHeader()];
      const styleForRow = ['itemNumber'];
      response.forEach(value => {
        this.body.push([
          {text : value.idPerdida , style: styleForRow },
          {text : value.fecha, style: styleForRow },
          {text : value.descripcion, style: styleForRow },
          {text: value.idDetalleProducto.idProducto.nombre, style: styleForRow },
          {text: value.idDetalleProducto.idProducto.codigo, style: styleForRow },
          {text : value.cantidad, style: styleForRow },
        ]);
      });
      const ff = {
        table: {
          widths: [50, 70, 100, 100, 70, 50],
          body: this.body,
        },
      };
      this.pdfBuilderService.generatePdf('', ff);
    });
  }

  private static buildTableHeader() {
    const style = ['itemsHeader', 'center'];
    return [
      {
        text: 'Perdida',
        style: style,
      },
      {
        text: 'Fecha',
        style: style,
      },
      {
        text: 'Descripcion',
        style: style,
      },
      {
        text: 'Producto',
        style: style,
      },
      {
        text: 'Codigo Producto',
        style: style,
      },
      {
        text: 'Cantidad',
        style: style,
      },
    ];
  }
}

