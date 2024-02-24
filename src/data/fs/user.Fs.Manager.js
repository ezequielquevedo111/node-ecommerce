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
      const user = {
        id: crypto.randomBytes(12).toString("hex"),
        name: data.name,
        photo: data.photo,
        email: data.email,
      };
      UserManager.#users.push(user);
      const dataUser = JSON.stringify(UserManager.#users, null, 2);
      fs.writeFileSync(this.path, dataUser);
      return user;
    } catch (error) {
      return error.message;
    }
  }

  //METODO PARA LEER TODOS LOS ARCHIVOS CON VALIDACIONES//
  async read(options = {}) {
    try {
      let doc = await fs.promises.readFile(this.path, settings);
      let data = JSON.parse(doc);

      if (options.filter && options.filter.email) {
        data = data.filter((user) => user.email === options.filter.email);
      }
      if (options.sort) {
        data.sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (options.sort === "asc") {
            return nameA.localeCompare(nameB);
          } else if (options.sort === "desc") {
            return nameB.localeCompare(nameA);
          }
        });
      } else if (!data) {
        const error = new Error("Existing documents not found.");
        error.statusCode = 404;
        throw error;
      }
      return data;
    } catch (error) {
      throw error;
    }
  }

  read(options = {}) {
    return fs
      .readFile(this.path, settings)
      .then((data) => {
        let users = JSON.parse(data);

        if (options.filter && options.filter.email) {
          users = users.filter((user) => user.email === options.filter.email);
        }

        if (options.sort) {
          users.sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();

            if (options.sort === "asc") {
              return nameA.localeCompare(nameB);
            } else if (options.sort === "desc") {
              return nameB.localeCompare(nameA);
            }
          });
        }

        if (!data) {
          const error = new Error("Cannot found any users.");
          error.statusCode = 404;
          throw error;
        }

        return users;
      })
      .catch((error) => {
        error.statusCode = 404;
        throw error;
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
        console.log(error.message);
        error.statusCode = 404;
        throw error;
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
      error.statusCode = 404;
      throw error;
    }
  }

  update(id, data) {
    try {
      const oneUser = UserManager.#users.find((user) => user.id === id);
      if (
        !oneUser ||
        !(
          data.hasOwnProperty("name") ||
          data.hasOwnProperty("photo") ||
          data.hasOwnProperty("email")
        )
      ) {
        throw new Error(
          `There isn't a user with ID: ${id} or there isn't exist a property named as name, photo or email`
        );
      } else {
        for (const prop in data) {
          switch (prop) {
            case "name":
              oneUser.name = data.name;
              break;
            case "photo":
              oneUser.photo = data.photo;
              break;
            case "email":
              oneUser.email = data.email;
              break;
          }
        }
        fs.writeFileSync(
          this.path,
          JSON.stringify(UserManager.#users, null, 2)
        );
      }
      return oneUser;
    } catch (error) {
      console.log(error.message);
      error.statusCode = 404;
      throw error;
    }
  }
  readByEmail(email) {
    return UserManager.#users.filter((user) => user.email === email);
  }
}

const users = new UserManager("./src/data/fs/files/users.Fs.json");

// console.log(users.readByEmail("ezequevedo1@gmail.com"));

const readingUser = await users.read({
  sort: "asc",
});

console.log(readingUser);


export default users;

//Comentado el update porque cuando inicias nodemon se crea un loop porque ejecuta la siguiente linea//
// users.update("9bced94e5f95b7984981d737", { name: "lionel messi" });
