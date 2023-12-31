//VALORES INICIALES//
import fs from "fs";
import crypto from "crypto";
const settings = "utf-8";

//CLASE CON METODOS//
class UserManager {
  static #users = [];
  constructor(path) {
    this.path = path;
    this.isExist();
  }

  //METODO PARA VALIDAR SI EXISTE EL ARCHIVO O NO//
  isExist() {
    const exist = fs.existsSync(this.path, settings);
    if (exist) {
      const readContent = fs.readFileSync(this.path, settings);
      UserManager.#users = JSON.parse(readContent);
    } else {
      fs.writeFileSync(this.path, JSON.stringify([], null, 2));
    }
  }

  //METODO CREADOR CON VALIDACIONES//
  create(data) {
    try {
      if (
        !data.name ||
        typeof data.name !== "string" ||
        !data.photo ||
        typeof data.photo !== "string" ||
        !data.email ||
        typeof data.email !== "string"
      ) {
        throw new Error(
          "The values of name, photo, email, price and stock are required and must be of type string."
        );
      } else {
        const user = {
          id: crypto.randomBytes(12).toString("hex"),
          name: data.name,
          photo: data.photo,
          email: data.email,
        };
        UserManager.#users.push(user);
        const dataUser = JSON.stringify(UserManager.#users, null, 2);
        fs.writeFileSync(this.path, dataUser);
      }
    } catch (error) {
      return error.message;
    }
  }

  //METODO PARA LEER TODOS LOS ARCHIVOS CON VALIDACIONES//
  read() {
    return fs.promises
      .readFile(this.path, settings)
      .then((res) => JSON.parse(res))
      .catch((error) => {
        return error.message;
      });
  }

  //METODO PARA LEER UN ARCHIVO POR ID CON VALIDACIONES//
  readOne(id) {
    return fs.promises
      .readFile(this.path, settings)
      .then((res) => {
        const data = JSON.parse(res);
        const userById = data.find((user) => user.id === id);
        if (!userById) {
          throw new Error("No matches were found with the entered ID");
        } else {
          return userById;
        }
      })
      .catch((error) => {
        return error.message;
      });
  }

  //METODO PARA ELIMINAR POR ID//
  async destroy(id) {
    try {
      const oneUser = UserManager.#users.find((user) => user.id === id);
      if (oneUser) {
        UserManager.#users = UserManager.#users.filter(
          (user) => user.id !== id
        );

        await fs.promises.writeFile(
          this.path,
          JSON.stringify(UserManager.#users, null, 2)
        );

        console.log("Deleted user with ID: " + id);
        return oneUser.id;
      } else {
        throw new Error("There isn't a user with ID: " + id);
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
}

const users = new UserManager("./server/data/fs/files/users.Fs.json");

export default users;

// users.create({
//   name: "Sergio",
//   photo: "/desktop/images/bulldog.png",
//   email: "sergio23@gmail.com",
// });

// users.read();
// users.readOne(2);
// users.destroy("aaa");
