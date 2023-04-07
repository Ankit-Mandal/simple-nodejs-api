const path = require("path");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const swaggerUI = require("swagger-ui-express");
const bodyParser = require("body-parser");
const YAML = require("yamljs");
const morgan = require("morgan");
const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");

const { verifyToken } = require("./middlewares/auth");
const todoRoutes = require("./routes/todos");
const fileRoutes = require("./routes/files");
const authRoutes = require("./routes/auth");
const swaggerDocument = YAML.load(path.join(__dirname, "swagger.yaml"));

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));
app.use(cors());

// HOME PAGE
app.get("/", (req, res) => {
  // console.log(req.headers);
  res.contentType("text/html").send("<h1>Simple Node.js API</h1>");
});

// JWT Login
app.post("/register", authRoutes.registerUser);
app.post("/login", authRoutes.loginUser);

// MULTER - Image Upload
app.get("/uploadFile", verifyToken, fileRoutes.serveHtmlPage);
app.post("/uploadFile", verifyToken, fileRoutes.uploadFile);

// KNEXJS - TODOs
app.get("/todo", verifyToken, todoRoutes.getTodos); // Get All Todos
app.get("/todo/:id", verifyToken, todoRoutes.getTodo); // Get Todo by ID
app.post("/todo", verifyToken, todoRoutes.createTodo); // Create a Todo
app.patch("/todo/:id", verifyToken, todoRoutes.updateTodo); // Update Todo description only
app.put("/todo/:id/complete", verifyToken, todoRoutes.updateTodoComplete); // Update complete Todo body
app.delete("/todo/:id", verifyToken, todoRoutes.deleteTodo); // Delete a Todo

app.use("/swagger-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

/* IF NO ROUTES MATCH - 404 Error */
app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

/* TO HANDLE ERRORS */
app.use((error, req, res, next) => {
  console.error(error);

  let errorStatus = 500;
  let errorMessage = "An unknown error occurred";

  if (createHttpError.isHttpError(error)) {
    errorStatus = error.status;
    errorMessage = error.message;
  }
  res.status(errorStatus).json({
    status: errorStatus,
    error: errorMessage,
    // message: "Caught by middleware",
  });
});

app.listen(process.env.EXPRESS_PORT, () => {
  console.log(`App running at http://localhost:${process.env.EXPRESS_PORT}...`);
});
