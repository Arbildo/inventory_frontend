import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { STYLES } from './pdf-styles';

@Injectable({
  providedIn: 'root',
})
export class PdfBuilderService {

  constructor() { }
  public generatePdf(header, body) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const dd = {
      content: [
        header,
        body,
      ],
      styles : STYLES,
      defaultStyle: {
        columnGap: 20,
      },
    };

    pdfMake.createPdf(dd).download();
  }
}
