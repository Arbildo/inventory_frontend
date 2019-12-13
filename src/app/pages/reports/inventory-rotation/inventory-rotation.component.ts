import { Component } from '@angular/core';
import {LoteService} from '../../product/Utils/Services/lote.service';
import {ProductDetailService} from '../../product/Utils/Services/product-detail.service';
import {PdfBuilderService} from '../utils/services/pdf-builder.service';
import {ReportRestService} from '../utils/services/report-rest.service';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'ngx-inventory-rotation',
  templateUrl: './inventory-rotation.component.html',
  styleUrls: ['./inventory-rotation.component.scss'],
})
export class InventoryRotationComponent {
  lotsList = [];
  productDetailList = [];
  exactitudForm;
  constructor(
    private lotsService: LoteService,
    private productsDetailService: ProductDetailService,
    private pdfBuilderService: PdfBuilderService,
    private reportRestService: ReportRestService,
    private formBuilder: FormBuilder,
  ) {
    this.exactitudForm = this.formBuilder.group({
      idLote: '',
    });
    this.populateForm();
  }


  private populateForm(): void {
    const params = {
    };
    this.lotsService.getLotesBy(params).subscribe(response =>
      response.forEach((value) => {
        this.lotsList.push({
          idLote: value.idLote,
          nombre: value.nombre,
        });
      }));
    this.productsDetailService.getProductDetail(params).subscribe(response =>
      response.forEach((value) => {
        this.productDetailList.push({
          idProductoDetalle: value.idProductoDetalle,
          nombre: value.idProducto.nombre,
        });
      }));
  }

  public onGenerateReport() {
    const idLote = this.exactitudForm.value.idLote;
    const data = this.reportRestService.getRotationReportByIdLote(idLote).subscribe(
      response => {
        const body = [];
        const header = InventoryRotationComponent.buildDocumentHeader(response);
        response.details.forEach((value) => {
          body.push({
            producto: value.producto,
            detalleProducto: value.idProductoDetalle,
            stockInicial: value.stockInicial,
            detalles: value.detalles,
            total: value.total,
            rotacion: value.rotacion,
          });
        });
        const tableBody = this.buildBody(body);
        this.pdfBuilderService.generatePdf(header, tableBody);
      });
  }

  private buildBody(productDetail) {
    const styleForRow = ['itemNumber'];
    const tableBody = [];
    productDetail.forEach((detail) => {
      tableBody.push({
          columns: [
            {text: 'Producto: ' + detail.producto, style: styleForRow},
            {text: 'Id detalle: ' + detail.detalleProducto, style: styleForRow},
            {text: 'Stock inicial: ' + detail.stockInicial, style: styleForRow},
          ],
        },
        {
          table: {
            widths: [100, 120, 180, 70],
            body: this.formatLosing(detail.detalles),
          },
        },
        {
          table: InventoryRotationComponent.buildSummaryTable(detail),
          layout: 'lightHorizontalLines',
        },
      );
    });
    return tableBody;
  }

  private formatLosing(orderList) {
    const styleForRow = ['itemNumber'];
    const result = [InventoryRotationComponent.buildTableHeader()];
    orderList.length !== 0 ? orderList.forEach((perdida) => (
        result.push([
          { text: perdida.idDetallePedido, style: styleForRow },
          { text: perdida.cantidad, style: styleForRow },
          { text: perdida.precio, style: styleForRow },
        ]))) :
      result.push([
        { text: '', style: styleForRow },
        { text: '', style: styleForRow },
        { text: '', style: styleForRow },
      ]);
    return result;
  }

  private static buildTableHeader() {
    const style = ['itemsHeader', 'center'];
    return [
      {
        text: 'Id de detalle Pedido',
        style: style,
      },
      {
        text: 'Cantidad ',
        style: style,
      },
      {
        text: 'Precio',
        style: style,
      },
    ];
  }

  private static buildDocumentHeader(response) {
    return {
      columns: [
        [
          {
            text: response.lote.nombre,
            style: 'invoiceTitle',
            width: '*',
          },
          {
            stack: [
              {
                columns: [
                  {
                    text: 'Número de lote',
                    style: 'invoiceSubTitle',
                    width: '*',

                  },
                  {
                    text: response.lote.idLote,
                    style: 'invoiceSubValue',
                    width: 100,
                  },
                ],
              },
              {
                columns: [
                  {
                    text: 'Fecha de creación',
                    style: 'invoiceSubTitle',
                    width: '*',
                  },
                  {
                    text: response.lote.fechaCreacion,
                    style: 'invoiceSubValue',
                    width: 100,
                  },
                ],
              },
            ],
          },
        ],
      ],
    };
  }

  private static buildSummaryTable(detail) {
    return {
      widths: ['*', 80],
      body: [
        [
          {
            text: 'Total unidades vendidas:',
          },
          {
            text: detail.total,
          },
        ],
        [
          {
            text: 'Rotación de inventario:',
          },
          {
            text: detail.rotacion,
          },
        ],
        [
          {
            text: '',
            style: 'itemsFooterSubTitle',
          },
          {
            text: '',
            style: 'itemsFooterSubValue',
          },
        ],
      ],
    };
  }
}
