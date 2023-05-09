// Import http library
import http from "http"
import url  from "url";
import { generateLightHouseReport } from "./scripts/genrateLightHouseReport.js"
// use env variable to define tcp/ip port with a default
const PORT = process.env.PORT || 8080
//create our server object
const server = http.createServer()
// We define a function that runs in response a request event
server.on("request", async(request, response) => {
  // handle request based on method then URL

  try {
  const parsedUrl = url.parse(request.url, true);
  const query = parsedUrl.query;

  if(query.url) {
    const resp = await generateLightHouseReport(query.url);
    response.statusCode = 200
    response.write(resp);
    response.end()
      
  }

  // console.log(query);

  // const resp = await generateLightHouseReport();
  response.statusCode = 200
  // response.write(resp);
  response.end()
} catch(e) {
  response.statusCode = 500
  // response.write(resp);
  response.end()
}
})
// get the server to start listening
server.listen(PORT, err => {
  // error checking
  err ? console.error(err) : console.log(`listening on port http://localhost:${PORT}`)
})