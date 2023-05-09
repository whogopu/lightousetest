import { createBrowser, createReportWithBrowser } from "./lighthouse-util.js";
// import  Assert from "assert";
// import fs from 'fs';

export const generateLightHouseReport = async (url = 'https://www.99acres.com/', output) => {

    console.log('urlToTest: ', url)
    const browser = await createBrowser();

    const result = await createReportWithBrowser(
        browser,
        url,
        {
            output: ["json", "html"].includes(output) ? output : 'json'
        }
    );

    // Assert(result.report, "No report returned");

    // fs.writeFileSync("report.json", result.report, "utf-8");

    await browser.close();
    return result.report;
}