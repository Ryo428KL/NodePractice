// https://nodejs.keicode.com/nodejs/how-to-create-pdf-file.php
const fonts = {
    SawarabiGothic: {
      normal: './fonts/arial.ttf',
      bold: './fonts/arial.ttf',
    },
    LilitaOne: {
      normal: './fonts/verdana.ttf',
      bold: './fonts/verdana.ttf',
      italics: './fonts/verdana.ttf',
      bolditalics: './fonts/verdana.ttf'
    },
  };
  
  const PdfPrinter = require('pdfmake');
  const printer = new PdfPrinter(fonts);
  const fs = require('fs');
  
  const docDefinition = {
    content: [
      { text: 'This is a header', style: 'title' },
      'No styling here, this is a standard paragraph',
      { text: 'hello, ttf file is not for Japanese', margin: [0, 10] },
      { qr: 'https://nodejs.keicode.com/' , fit: '50' },
      { text: 'use margin properties ', margin: [100, 100]},
      { text: 'more than one styles use', style: ['h1', 'style2'] }
    ],
    styles: {
      title: {
        font: 'LilitaOne',
        fontSize: 24,
      },
      h1: {
        font: 'SawarabiGothic',
        fontSize: 18,
        bold: true
      },
      style2: {
        alignment: 'right',
        color: 'blue',
      }
    },
    defaultStyle: {
      font: 'SawarabiGothic',
      fontSize: 14,
    }
  };
  
  const pdfDoc = printer.createPdfKitDocument(docDefinition);
  pdfDoc.pipe(fs.createWriteStream('sample.pdf'));
  pdfDoc.end();