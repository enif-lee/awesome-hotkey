import {GoogleSpreadsheet, GoogleSpreadsheetRow, GoogleSpreadsheetWorksheet} from 'google-spreadsheet';
import path from 'path';
import mkdirp from 'mkdirp';
import fs from 'fs';
import client from 'axios';

export function sheetByTitle(sheet: GoogleSpreadsheet, title: string): GoogleSpreadsheetWorksheet {
    for (let key in sheet.sheetsById) {
        if (sheet.sheetsById[key].title === title) {
            return sheet.sheetsById[key];
        }
    }

    throw `${title} 시트를 찾을 수 없습니다.`;
}

export function* sheetsBy(
    sheet: GoogleSpreadsheet,
    condition: (sheet: GoogleSpreadsheetWorksheet) => boolean,
): Generator<GoogleSpreadsheetWorksheet> {
    for (let key in sheet.sheetsById) {
        if (condition(sheet.sheetsById[key])) {
            yield sheet.sheetsById[key];
        }
    }
}

export async function loadSheetWithCredential(sheetId: string, credential: any) {
    debug(`SPREAD SHEET ID : ${sheetId}`);
    const doc = new GoogleSpreadsheet(sheetId);

    await doc.useServiceAccountAuth(credential);
    await doc.loadInfo();
    debug('LOAD COMPLETE');
    debug(`SPREAD SHEET TITLE : ${doc.title}, WORKSHEET COUNT : ${doc.sheetCount}`);

    return doc;
}

export async function loadSheet(sheetId: string): Promise<GoogleSpreadsheet> {
    // @ts-ignore
    return await loadSheetWithCredential(sheetId, await import('../.secrets/credential.json'));
}

export const debug = console.log
export const error = console.error;

export type MetadataObject = {
    [category: string]: any[];
};

export async function parseSpreadSheet(doc: GoogleSpreadsheet): Promise<MetadataObject> {
    debug('GENERAL_SPREADSHEET_PARSER');
    const result: MetadataObject = {};

    const promises = [...sheetsBy(doc, (sheet) => !sheet.title.startsWith('#'))].map(async (worksheet) => {
        debug(`PROCESS SPREADSHEET : ${worksheet.title}`);
        const sheetDebug = (message: string) => debug(`${worksheet.title} : ${message} `);

        const tempHeader = Array.from({length: worksheet.columnCount}, (_, i) => 'C' + i);
        worksheet.headerValues = tempHeader;

        sheetDebug(`LOAD COLUMN VALUES`);
        const header = await worksheet.getRows({offset: 0, limit: 1});
        worksheet.headerValues = tempHeader
            .map((tempColumn) => header[0][tempColumn])
            .filter((column) => column !== undefined);
        const [, ...columns] = worksheet.headerValues;

        sheetDebug(`VALIDATE COLUMN NAMES `);
        validateColumns(worksheet.title, columns);
        sheetDebug(`LOADED COLUMNS(${columns.join(', ')})`);

        sheetDebug(`LOAD DATA ROWS `);
        const rows = await worksheet.getRows({
            offset: 1,
            limit: worksheet.rowCount,
        });
        sheetDebug(`LOADED DATA ROWS(${worksheet.rowCount})`);

        sheetDebug(`PROCESSING DATA ROWS TO JSON`);
        result[worksheet.title] = rows.map((row) => convertObjectFromRow(columns, row));
        sheetDebug(`DONE`);
    });
    await Promise.all(promises);
    return result;
}

export function validateColumns(sheetName: string, columns: string[]) {
    for (let column of columns) {
        if (column.includes('.') && column.indexOf('.') != column.lastIndexOf('.'))
            throw `Not yet supported nested array or object property type(SHEET: ${sheetName}, COLUMN: ${column})`;
    }
}

export function convertObjectFromRow(columns: string[], row: GoogleSpreadsheetRow): any {
    return columns
        .filter((c) => !c.startsWith('#'))
        .reduce((result, column) => {
            if (column.includes('.')) {
                let [property, key] = column.split('.');
                const isNumberKey = !isNaN(parseInt(key));

                if (!result[property]) result[property] = isNumberKey ? [] : {};

                if (isNumberKey) {
                    if (!!row[column]) result[property].push(row[column]);
                } else if (!!row[column] && !row[column].startsWith('#')) result[property][key] = row[column];
                else result[property][key] = null;
            } else {
                if (!!row[column] && !row[column].startsWith('#')) result[column] = row[column];
                else result[column] = null;
            }

            return result;
        }, {} as any);
}

export function storeJsonData(data: unknown, paths: string) {
    mkdirp.sync(path.resolve('data'));

    let dataPath = path.join('data', paths);
    debug('STORE PATH : ' + path.resolve(dataPath));
    fs.writeFileSync(dataPath, JSON.stringify(data), {flag: 'w+'});
}