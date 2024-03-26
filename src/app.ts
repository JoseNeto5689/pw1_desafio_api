import express from "express"
import checkExistsUserAccount from "./middleware/checkExistsUserAccount"
import routes from "./routes/index.route"

const app = express()

app.use(express.json())
app.use(routes)


app.listen(3000, () => {
    console.table({
        status: "working",
        url: "http://localhost:3000"
    })
})