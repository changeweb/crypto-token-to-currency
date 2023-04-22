const csv = require('csv-parser');
const fs = require('fs');

export class CsvHandler {
  async readCsvFile(filePath: string) {
    return await fs.createReadStream(filePath).pipe(csv());
  }
}
