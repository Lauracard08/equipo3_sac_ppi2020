const express = require("express")
const morgan = require("morgan")
const app = express()

//Middelwares
app.use(morgan('dev'))
app.use(express.json())

//Routes
app.use("/api/", require("./routes/student"))
app.use("/api/", require("./routes/question"))
app.use("/api/", require("./routes/users"))

app.get("/", function (req, res) {
    res.send("Hola, bienvenidos al maravilloso mundo del aprendizaje con Javacs")
})

app.listen(8030, function () {
    console.log("El servidor esta corriedno en un puerto 8030")
})