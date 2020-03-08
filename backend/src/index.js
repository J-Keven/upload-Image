require("dotenv").config()

const express = require("express")
const morgan = require("morgan")
const mongoose = require("mongoose")
const path = require("path")


const app = express()
const Routes = require("./routes")

mongoose.connect(process.env.CONNECT_MONGODB, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log("success connection database")
}).catch((error) => {
    console.log("error connect database: ", error)
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use('/files', express.static(path.resolve(__dirname, '..', 'temp', 'uploads')))

app.use(Routes)

const PORT = (process.env.PORT || 3333)

app.listen(PORT, () => {
    console.log("O server esta rodando em: http://localhost:3333")
})