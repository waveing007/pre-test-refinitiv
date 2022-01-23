
const request = require("request-promise");
const cheerio = require("cheerio");

async function main() {
    var arg = process.argv.slice(2);
    var j = request.jar();
    var url = "https://codequiz.azurewebsites.net/";
    var cookie = request.cookie('hasCookie=true');
    j.setCookie(cookie, url);

    const result = await request.get({ url: "https://codequiz.azurewebsites.net", jar: j });
    const $ = cheerio.load(result);
    const scrapedData = [];
    const tableHeaders = [];
    $("body > table > tbody > tr").each((index, element) => {
        if (index === 0) {
            const ths = $(element).find("th");
            $(ths).each((i, element) => {
                let header = $(element).text().toLowerCase().trim();
                header = header.split(' ');
                tableHeaders.push(header[0]);
            });
            return true;
        }
        const tds = $(element).find("td");
        const tableRow = {};
        $(tds).each((i, element) => {
            tableRow[tableHeaders[i]] = $(element).text();
        });
        scrapedData.push(tableRow);
    });

    const value = scrapedData.reduce((previousValue, currentValue) => {
        if ((currentValue.fund).toUpperCase().indexOf(arg) > -1) {
            previousValue = currentValue.nav
        }
        return previousValue
    }, null) || 'Not Found !!!';
    console.log(value);
}

main();