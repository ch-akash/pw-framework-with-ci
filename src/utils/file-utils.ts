import { parse } from "csv-parse/sync";
import { FilePaths } from "../constants/globals.ts";
import path from "path";
import fs from "fs";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function getTestDataCsv() {
  return getDataFromCsvFile(FilePaths.TEST_DATA_FILE);
}

export function getDataFromCsvFile(filePath: string) {
  return parse(fs.readFileSync(path.join(__dirname, "../..", filePath)), {
    skip_empty_lines: true,
    columns: true,
  });
}
