import { log } from "node:console"
import http from "node:http"

const clientRequest = http.request({port:3000,method:"POST"})

clientRequest.write("hi from client ")

clientRequest.on("error",()=>{
    console.log('error on the client')
})
clientRequest.on("response",(response)=>{
    response.on("data",(chunk)=>{
        log(chunk)
    })
})
