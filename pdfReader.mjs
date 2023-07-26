import fs from 'fs';
import path from 'path';
import { PdfReader } from 'pdfreader';


export function listFilesInFolder(folderPath) {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error('Erro ao listar arquivos na pasta:', err);
      return;
    }

    console.log('Arquivos na pasta:');
    files.forEach( async (file) => {
      const filePath = path.join(folderPath, file);

      // Verificar se o arquivo é um PDF
      if (path.extname(file).toLowerCase() === '.pdf') {
        console.log(filePath);
      }
      console.log("Her")

      const pdfData = await extractPdfData(filePath);
      console.log(pdfData[16], pdfData[17], pdfData[18]);
      console.log(pdfData[21], pdfData[22], pdfData[24]);
      console.log('--------------------------------------')
      console.log(pdfData[34], pdfData[33], pdfData[34], pdfData[35]);
      console.log('--------------------------------------')
      console.log(pdfData[45], pdfData[50], pdfData[51]);
      console.log(pdfData[61], pdfData[72], pdfData[82])
      console.log('--------------------------------------')
      console.log(pdfData[91], pdfData[102], pdfData[120]);
      console.log('--------------------------------------')
      console.log(pdfData[110], pdfData[112], pdfData[113], pdfData[114], pdfData[115]);
    })
  })
}

function extractPdfData(filePath) {
  return new Promise((resolve, reject) => {
    const reader = new PdfReader();
    const pdfData = [];

    reader.parseFileItems(filePath, function (err, item) {
      if (!item) {
        resolve(pdfData);
        return;
      }

      if (item.text) {
        pdfData.push(item.text);
      }
    });

  
  });
}


listFilesInFolder('Faturas')