const express = require('express')
const morgan = require('morgan')

const app = express()
const port = 3009

app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.send("oke bokkkssss")
})

app.use((req, res) => {
    console.log(`${req.path} tidak ditemukan`);
})

app.listen(port, () => {
    console.log("server runing");
})