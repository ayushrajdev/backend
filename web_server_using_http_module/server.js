import http from "node:http";
import { open } from "node:fs/promises";

const server = http.createServer(async (req, res) => {
  console.log("request arrived:", req.url);

  try {
    let filePath;
    let contentType;

    if (req.url === "/") {
      filePath = "./index.html";
      contentType = "text/html";
    } else if (req.url === "/style.css") {
      filePath = "./style.css";
      contentType = "text/css";
    } else if (req.url === "/script.js") {
      filePath = "./script.js";
      contentType = "text/javascript";
    }
    else if (req.url === "/about.html") {
        filePath = "./about.html";
        contentType = "text/html";
    }
    else {
      res.statusCode = 404;
      res.end("404 Not Found");
      return;
    }

    const fileHandle = await open(filePath);
    const stream = fileHandle.createReadStream();

    res.statusCode = 200;
    res.setHeader("Content-Type", contentType);

    stream.pipe(res);

    stream.on("end", () => {
      fileHandle.close();
    });

    stream.on("error", (err) => {
      console.error(err);
      res.statusCode = 500;
      res.end("Internal Server Error");
    });
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
});

server.listen(3000, () => {
  console.log("server is listening on port 3000");
});
