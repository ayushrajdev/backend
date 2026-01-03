import net from "node:net";
import fs, { open } from "node:fs/promises";

const server = net.createServer(async (socket) => {
  const readhandle = await open("./file.txt");
  const readStream = await readhandle.createReadStream({ highWaterMark: 1000 });

  socket.on("data", async (chunk) => {
    // when the browser send the request data event fires and then browser writes the request as a header.
    console.log(chunk.toString());
    socket.write("HTTP/1.1\n");
    socket.write("Access-Control-Allow-Origin: *\n");
    socket.write("hello: world");
    socket.write("\n\n");
    await readStream.pipe(socket);
  });

  socket.on("error", (e) => {
    console.log("socket error  ", e);
  });

  readStream.on("end", () => {
    socket.end("wow");
  });

  readStream.on("error", (error) => {
    socket.end(error);
  });
});

server.listen(3000, () => {
  console.log("server is listening on port 3000");
});
