var express = require("express")
var app = express()
var bodyparse = require("body-parser")
app.use(express.static(__dirname + "/public"));
var methodOverride = require("method-override")
app.use(methodOverride("_method"))

app.use(bodyparse.urlencoded({ extended: true }))
app.set("view engine", "ejs")

require("./config/dbconnection")
var curd = require("./models/curd")

app.get("/", async function(req, res) {
    try {
        var data = await curd.find({})
        res.render("read", { data: data })
    } catch (e) {
        console.log(e)
    }
})

app.get("/add", function(req, res) {
    res.render("add")
})

app.post("/", async function(req, res) {
    try {
        var Data = { name: req.body.name, price: req.body.price }
        var createData = await curd.create(Data)
        res.redirect("/")
    } catch (e) {
        console.log(e)
    }
})

app.get("/:id/edit", async function(req, res) {
    try {
        var data = await curd.findById(req.params.id)
        res.render("edit", { data: data })
    } catch (e) {
        console.log(e)
    }
})

app.put("/:id", async function(req, res) {
    try {
        var data = { name: req.body.name, price: req.body.price }
        var updateData = await curd.findByIdAndUpdate(req.params.id, data)
        console.log(updateData)
        res.redirect("/")
    } catch (e) {
        console.log(e)
    }
})

app.delete("/:id", async function(req, res) {
    try {
        var deleteData = await curd.findByIdAndRemove(req.params.id)
        res.redirect("/")
    } catch (e) {
        console.log(e)
    }
})

app.listen(3000 || process.env.PORT, function() {
    console.log("started")
})