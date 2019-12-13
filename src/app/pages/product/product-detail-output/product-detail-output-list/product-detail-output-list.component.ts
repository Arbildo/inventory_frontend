import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {ProductOutputService} from '../../Utils/Services/product-output.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {OutputListDetailModalComponent} from './output-list-detail-modal/output-list-detail-modal.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PdfBuilderService} from '../../../reports/utils/services/pdf-builder.service';

@Component({
  selector: 'ngx-product-detail-output-list',
  templateUrl: './product-detail-output-list.component.html',
  styleUrls: ['./product-detail-output-list.component.scss'],
})
export class ProductDetailOutputListComponent implements OnInit {
  settings = {
    columns: {
      idPedido: {
        title: 'Id',
        type: 'text',
        editable: false,
      },
      cliente: {
        title: 'Cliente',
        type: 'string',
      },
      numeroDoc: {
        title: 'Número Documento',
        type: 'string',
      },
      idEncargado: {
        title: 'Id Encargado',
        type: 'string',
      },
      encargado: {
        title: 'Encargado',
        type: 'string',
      },
      fechaPedido: {
        title: 'Fecha Pedido',
        type: 'string',
      },
      total: {
        title: 'Total',
        type: 'string',
      },
    },
    actions: false,
  };
  source: LocalDataSource = new LocalDataSource();
  datesforReport: {date}[] = [];
  form: FormGroup;
  private body;
  constructor(private pedidoService: ProductOutputService,
              private modalService: NgbModal,
              private fb: FormBuilder,
              private pdfBuilderService: PdfBuilderService) {
    this.populateTable();
    this.populateSelectForReport();
  }

  ngOnInit() {
  }

  private populateTable() {
    const params = {};
    this.pedidoService.getPedidos(params).subscribe(response => {
      const list = [];
      response.forEach((value => {
        list.push({
          idPedido    : value.idPedido,
          cliente: value.idCliente.nombre,
          numeroDoc: value.idCliente.numeroDoc,
          idEncargado : value.idEncargado.idUsuario,
          encargado: value.idEncargado.usuario,
          fechaPedido : value.fechaPedido,
          total: value.total,
        });
      }));
      this.source.load(list);
    });
  }
  onUserRowSelect(event) {
    const idPedido = event.data.idPedido;
    const modalRef = this.modalService.open(OutputListDetailModalComponent);
    modalRef.componentInstance.idPedido = idPedido;
  }

  populateSelectForReport() {
    this.form = this.fb.group({
      date: '',
    });
    this.pedidoService.getDatesForReport().subscribe(response => {
      response.forEach((value) => {
        this.datesforReport.push({
          date : value,
        });
      });
    });
  }

  onReportClick() {
    const params = {
      fechaPedido: this.form.controls.date.value,
    };
    this.pedidoService.getPedidosForReport(params).subscribe(response => {
      this.body = [ProductDetailOutputListComponent.buildTableHeader()];
      const styleForRow = ['itemNumber'];
      response.forEach(value => {
        this.body.push([
          {text : value.idPedido.idPedido , style: styleForRow },
          {text : value.idPedido.fechaPedido, style: styleForRow },
          {text : value.idPedido.idCliente.nombre, style: styleForRow },
          {text: value.idPedido.idEncargado.nombres + ' ' +
              value.idPedido.idEncargado.apellidos, style: styleForRow },
          {text : value.idProductoDetalle.idProducto.nombre, style: styleForRow },
          {text : value.cantidad, style: styleForRow },
        ]);
      });
      const ff = {
            table: {
              widths: [50, 100, 100, 70, 70 , 50],
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
        text: 'Pedido',
        style: style,
      },
      {
        text: 'Fecha ',
        style: style,
      },
      {
        text: 'Cliente',
        style: style,
      },
      {
        text: 'Encargado',
        style: style,
      },
      {
        text: 'Producto',
        style: style,
      },
      {
        text: 'Cantidad',
        style: style,
      },
    ];
  }
}
