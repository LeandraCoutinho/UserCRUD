import express from "express";
import UserRoute from "./route/UserRoute";

const app = express();

app.use(express.json());
app.use("/users", UserRoute);

app.listen(3000, () => console.log("Server is running"));