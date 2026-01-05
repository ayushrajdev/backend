import net from "node:net";
import fs, { open } from "node:fs/promises";

const server = net.createServer(async (socket) => {

    const writeHandle = await open("output.txt","w+")
    const writeStream = await writeHandle.createWriteStream()

//   const fileHandle = await open(
//     "C:\\Users\\ayush\\Downloads\\The Social Network (2010) Dual Audio {Hindi-English} 1080p.mkv"
//   );
//   const readStream = await fileHandle.createReadStream({
//     highWaterMark: 1000,
//   });
//   const { size } = await fileHandle.stat();
  socket.on("data", async (chunk) => {
    // when the browser send the request data event fires and then browser writes the request as a header.
    // console.log(chunk.toString());
    // socket.write("HTTP/1.1\n");
    // socket.write("Access-Control-Allow-Origin: *\n");
    // socket.write(`Content-Length: ${size}\n`);
    // socket.write(`Content-Type: text/plain \n`);
    // socket.write(`Content-Type: image/jpeg \n`);
    // socket.write(`Content-Disposition:attachment;   \n`);
    // socket.write("hello: world");
    // socket.write("\n\n");
    // await readStream.pipe(socket);
    // console.log(chunk.toString())

    if (/WebKitFormBoundary.+--/.test(chunk.toString())) {
        socket.end("got the data")
    }
    writeStream.write(chunk)
  });

  socket.on("error", (e) => {
    console.log("socket error  ", e);
  });

//   readStream.on("end", () => {
//     socket.end("wow");
//     fileHandle.close()
//   });

//   readStream.on("pause", () => {
//     console.log("paused by the browser");
//   });

//   readStream.on("resume", () => {
//     console.log("resuemd by the browser");
//   });

//   readStream.on("error", (error) => {
//     socket.end(error);
//   });
});

server.listen(3000, () => {
  console.log("server is listening on port 3000");
});
