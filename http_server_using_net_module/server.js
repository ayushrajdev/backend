import net from "node:net";
import fs, { open } from "node:fs/promises";

const server = net.createServer(async (socket) => {
  const readhandle = await open("./file.txt");
  const readStream = await readhandle.createReadStream({ highWaterMark: 1 });

  socket.on("data", async (chunk) => {
    // when the browser send the request data event fires and then browser writes the request as a header.
    console.log(chunk.toString());
    socket.write("HTTP/1.1\n\n");
    await readStream.pipe(socket);
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
