import { Router } from "express";

const ordersRouter = Router();

ordersRouter.post("/", async (req, res) => {
  //metodo create fs
});

ordersRouter.get("/:uid", async (req, res) => {
  //metodo create readOne(id)
});

ordersRouter.delete("/:oid", async (req, res) => {
  //metodo destroy(id) fs
});

export default ordersRouter;
