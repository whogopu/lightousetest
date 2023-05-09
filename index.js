import express from 'express'
import url from "url";
import { generateLightHouseReport } from "./scripts/genrateLightHouseReport.js"
const PORT = process.env.PORT || 8080

const app = express()

app.get('/', async (req, res) => {
  try {
    const parsedUrl = url.parse(req.url, true);
    const query = parsedUrl.query;

    let defaultUrl = 'https://www.99acres.com/property-in-noida-ffid'
    let { url: queryUrl = defaultUrl } = query;

    console.log('queryUlr', queryUrl)
    const reportRes = await generateLightHouseReport(queryUrl, 'json');
    // const reportRes = await generateLightHouseReport(queryUrl, 'html');

    // res.send('Hello World!' + queryUrl)
    res.send(reportRes)
  } catch (e) {
    res.status(500).send("Something went wrong");
  }
})

app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`)
})