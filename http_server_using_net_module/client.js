const response = await fetch("http://127.0.0.1:3000/");

response.headers.forEach((header) => {
  console.log(header);
});
