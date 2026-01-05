import http from "node:http";

const server = http.createServer((req, res) => {
  console.log(req.headers);
  console.log(req.method);
  console.log(req.url);
  console.log("request arrived");
  req.on("data", (chunk) => {
    console.log(chunk);
  });
  res.setHeader("Content-Length", "10");
  res.write("hi from http server");
});

// server.on("request",(req,res)=>{
//     console.log('request arrived')
//     req.on("data",(chunk)=>{
//         console.log(chunk)
//     })
//     res.setHeader("Content-Length","10")
//     res.write("hi from http server")
// })

server.on("connection", (socket) => {
  console.log("connection established");
  socket.on("data", (chunk) => {
    console.log(chunk.toString());
  });
  // socket.end("HTTP\n\nhelllo")
});

server.listen(3000, () => {
  console.log("server is listensing on port 3000");
});
