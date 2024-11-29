import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import bookRoutes from "./routes/bookRoutes.js"
import userRoutes from "./routes/userRoutes.js"

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || "6969"

//TODO: User
app.use("/users", userRoutes)

//TODO: Books
app.use("/books", bookRoutes)

app.get("/", (req, res) => {
  res.send("Server is running").status(200)
})

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})

