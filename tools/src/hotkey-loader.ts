import {loadSheet, parseSpreadSheet, storeJsonData} from "./common";


async function main() {
    const sheet = await loadSheet("1vBcSm9kAPWpYE_V-et2wr7EiM2ClJHwtqTTL9T8vitc");
    const data = await parseSpreadSheet(sheet);
    await storeJsonData(data, "result.json");
}

main().then(console.log)