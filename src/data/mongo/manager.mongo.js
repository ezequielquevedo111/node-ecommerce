import isOrderCompleted from "../../utils/isOrderCompleted.js";
import notFoundDoc from "../../utils/notFoundDoc.util.js";
import Mongoose from "mongoose";

class MongoManager {
  constructor(model) {
    this.model = model;
  }
  //INGRESAR EN CADA CONTROLADOR Y CAMBIAR LOS ERRORES DESDE AHI YA QUE EN MONGO
  //NO LOS VOY A MANEJAR
  async create(data) {
    try {
      const doc = await this.model.create(data);
      return doc;
    } catch (error) {
      throw error;
    }
  }
  async read(obj) {
    try {
      const { filter, orderAndPaginate } = obj;
      const allDocs = await this.model.paginate(filter, orderAndPaginate);
      const data = JSON.parse(JSON.stringify(allDocs));
      return data;
    } catch (error) {
      throw error;
    }
  }
  async readOne(id) {
    try {
      const doc = await this.model.findById(id);
      return doc;
    } catch (error) {
      throw error;
    }
  }
  async update(id, data) {
    try {
      const opt = { new: true };
      const doc = await this.model.findByIdAndUpdate(id, data, opt);
      return doc;
    } catch (error) {
      throw error;
    }
  }

  //Al eliminar una order que ya está finalizada y se descontó el stock
  //Antes de eliminarla hay que reecomponer el stock del producto
  //que antes se le descontó//

  async destroy(id) {
    try {
      const doc = await this.model.findByIdAndDelete(id);
      // notFoundDoc(doc);
      return doc;
    } catch (error) {
      throw error;
    }
  }

  //INICIO - Metodos de Manager Orders//
  //METODOS SIN USO//
  // async readOrders(id) {
  //   try {
  //     const doc = await this.model.find({ userId: id });
  //     notFoundDoc(doc);
  //     if (doc.length === 0) {
  //       const error = new Error("There are no documents available.");
  //       error.statusCode = 404;
  //       throw error;
  //     }
  //     return doc;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // async updateOrder(data, propUpdate) {
  //   try {
  //     const opt = { new: true };
  //     const docUpdate = await this.model
  //       .findByIdAndUpdate(data, propUpdate, opt)
  //       .populate("productId", "price stock title");
  //     //Lo populo directamente en el metodo porque Moongose
  //     //no permite aplicarle el metodo pre con findByIdAndUpdate//

  //     const stockUpdate = await isOrderCompleted(docUpdate, data);
  //     return docUpdate;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
  //METODOS SIN USO//

  //VERIFICAR DE HACER EL UPDATE DEL STOCK MEDIANTE  ESTE METODO//
  //VERICAR COMO POPULAR TODOS LOS DATOS CUANDO CREO UNA ORDEN//
  async report(uid) {
    try {
      const report = await this.model.aggregate([
        {
          $match: { userId: new Mongoose.Types.ObjectId(uid) },
        },
        {
          $lookup: {
            from: "products",
            foreignField: "_id",
            localField: "productId",
            as: "productId",
          },
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [{ $arrayElemAt: ["$productId", 0] }, "$$ROOT"],
            },
          },
        },
        { $set: { subtotal: { $multiply: ["$price", "$quantity"] } } },
        { $group: { _id: "$userId", total: { $sum: "$subtotal" } } },
        {
          $project: {
            _id: 0,
            userId: "$_id",
            total: "$total",
            date: new Date(),
          },
        },
      ]);
      //VER DE AGREGAR ACÁ EL UPDATE DEL PRODUCTO UNA VEZ YA TENIDO EL REPORT//
      return report;
    } catch (error) {
      throw error;
    }
  }

  async readByEmail(email) {
    try {
      const docEmail = await this.model.findOne({ email });

      // if (!docEmail || docEmail.length === 0) {
      //   const error = new Error(`User with email ${email} not found`);
      //   error.statusCode = 404;
      //   throw error;
      // }
      return docEmail;
    } catch (error) {
      throw error;
    }
  }

  async stats({ filter }) {
    try {
      let stats = await this.model.find(filter).explain("executionStats");

      stats = {
        quantity: stats.executionStats.nReturned,
        time: stats.executionStats.executionTimeMillis,
      };
      return stats;
    } catch (error) {
      throw error;
    }
  }

  //FIN - Metodos de Manager Orders//
}

// const products = new MongoManager(Product);
// const users = new MongoManager(User);
// const orders = new MongoManager(Order);

// export { products, users, orders };

export default MongoManager;
