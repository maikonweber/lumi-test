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
      console.log(pdfData[15]);
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