import express, { Request, Response } from "express";
import productsRouter from "../products/routes/productsRoutes";
import ordersRouter from "../Orders/routes/OrderRoutes";

const router = express.Router();

// router.use("/users", usersRouter);

router.use("/products", productsRouter);

router.use("/orders", ordersRouter);

router.use("*", (req: Request, res: Response) => {
  console.log(req);
  res.status(404).send("Page not found!");
});

export default router;
