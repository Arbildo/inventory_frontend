import { Component, OnInit } from '@angular/core';
import {LoteService} from '../../product/Utils/Services/lote.service';
import {ProductDetailService} from '../../product/Utils/Services/product-detail.service';
import {ReportRestService} from '../utils/services/report-rest.service';
import {PdfBuilderService} from '../utils/services/pdf-builder.service';
import {FormBuilder} from '@angular/forms';


@Component({
  selector: 'ngx-inventory-precision',
  templateUrl: './inventory-precision.component.html',
  styleUrls: ['./inventory-precision.component.scss'],
})
export class InventoryPrecisionComponent {
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
    const data = this.reportRestService.getPresitionReportByIdLote(idLote).subscribe(
      response => {
        const body = [];
        const header = InventoryPrecisionComponent.buildDocumentHeader(response);
        response.details.forEach((value) => {
          body.push({
            producto: value.producto,
            detalleProducto: value.idProductoDetalle,
            stockInicial: value.stockInicial,
            perdidas: value.losing,
            total: value.total,
            exactitud: value.exactitud,
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
            body: this.formatLosing(detail.perdidas),
          },
        },
        {
          table: InventoryPrecisionComponent.buildSummaryTable(detail),
          layout: 'lightHorizontalLines',
        },
      );
    });
    return tableBody;
  }

  private formatLosing(losingList) {
    const styleForRow = ['itemNumber'];
    const result = [InventoryPrecisionComponent.buildTableHeader()];
    losingList.length !== 0 ? losingList.forEach((perdida) => (
        result.push([
          {text: perdida.codigo, style: styleForRow},
          {text: perdida.fecha, style: styleForRow},
          {text: perdida.descripcion, style: styleForRow},
          {text: perdida.cantidad, style: styleForRow},
        ]))) :
      result.push([
        {text: '', style: styleForRow},
        {text: '', style: styleForRow},
        {text: '', style: styleForRow},
        {text: '', style: styleForRow},
      ]);
    return result;
  }

  private static buildTableHeader() {
    const style = ['itemsHeader', 'center'];
    return [
      {
        text: 'Código de pérdida',
        style: style,
      },
      {
        text: 'Fecha ',
        style: style,
      },
      {
        text: 'Descripción',
        style: style,
      },
      {
        text: 'Cantidad',
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
            text: 'Total de pérdidas:',
          },
          {
            text: detail.total,
          },
        ],
        [
          {
            text: 'Exactitud de inventario:',
          },
          {
            text: detail.exactitud,
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
