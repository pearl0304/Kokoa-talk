import App from "./app.js"
const app = new App().app
const PORT = 7000 

app.listen(PORT,()=>{
    console.log(`Express server connect! http://localhost:${PORT}`)
})