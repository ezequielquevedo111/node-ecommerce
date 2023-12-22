import express from "express";
import products from "./data/fs/product.Fs.Manager.js";
import users from "./data/fs/user.Fs.Manager.js";

// Creación server //
const server = express();

const PORT = 8080;
const ready = () => console.log("server ready on PORT: " + PORT);

//Middlewares//
server.use(express.urlencoded({ extended: true }));

server.listen(PORT, ready);

// Endpoints - Products //
server.get("/api/products", async (req, res) => {
  try {
    const allProducts = await products.read();
    if (allProducts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "not found",
      });
    } else {
      return res.status(200).json({
        success: true,
        response: allProducts,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

server.get("/api/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const oneProduct = await products.readOne(pid);
    if (oneProduct.length === 0) {
      return res.status(404).json({
        success: false,
        message: "not found",
      });
    } else {
      return res.status(200).json({
        success: true,
        response: oneProduct,
      });
    }
  } catch (error) {
    return res.status(505).json({
      sucess: false,
      message: "Internal Server Error",
    });
  }
});

// Endpoints - Users //
server.get("/api/users", async (req, res) => {
  try {
    const allUsers = await users.read();
    if (allUsers.length === 0) {
      return res.status(404).json({
        success: false,
        message: "not found",
      });
    } else {
      return res.status(200).json({
        success: true,
        response: allUsers,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

server.get("/api/users/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const oneUser = await users.readOne(uid);
    if (oneUser.length === 0) {
      return res.status(404).json({
        success: false,
        message: "not found",
      });
    } else {
      return res.status(200).json({
        success: true,
        response: oneUser,
      });
    }
  } catch (error) {
    return res.status(505).json({
      sucess: false,
      message: "Internal Server Error",
    });
  }
});
