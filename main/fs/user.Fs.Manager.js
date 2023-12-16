//VALORES INICIALES//
const fs = require("fs");
const route = "./main/fs/data/users.Fs.json";
const settings = "utf-8";

//CLASE CON METODOS//
class UserManager {
  static #users = [];
  constructor() {
    this.isExist();
  }

  //METODO PARA VALIDAR SI EXISTE EL ARCHIVO O NO//
  isExist() {
    const exist = fs.existsSync(route, settings);
    if (exist) {
      const readContent = fs.readFileSync(route, settings);
      UserManager.#users = JSON.parse(readContent);
    } else {
      fs.writeFileSync(route, JSON.stringify([], null, 2));
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
          id:
            UserManager.#users.length === 0
              ? 1
              : UserManager.#users[UserManager.#users.length - 1].id + 1,
          name: data.name,
          photo: data.photo,
          email: data.email,
        };
        UserManager.#users.push(user);
        const dataUser = JSON.stringify(UserManager.#users, null, 2);
        fs.writeFileSync(route, dataUser);
      }
    } catch (error) {
      return error.message;
    }
  }

  //METODO PARA LEER TODOS LOS ARCHIVOS CON VALIDACIONES//
  read() {
    return fs.promises
      .readFile(route, settings)
      .then((res) => console.log(JSON.parse(res)))
      .catch((error) => {
        return error.message;
      });
  }

  //METODO PARA LEER UN ARCHIVO POR ID CON VALIDACIONES//
  readOne(id) {
    return fs.promises
      .readFile(route, settings)
      .then((res) => {
        const data = JSON.parse(res);
        const userById = data.find((user) => user.id === Number(id));
        if (!userById) {
          throw new Error("No matches were found with the entered ID");
        } else {
          return console.log(userById);
        }
      })
      .catch((error) => {
        return error.message;
      });
  }
}

const user = new UserManager();

user.create({
  name: "Sergio",
  photo: "/desktop/images/bulldog.png",
  email: "sergio23@gmail.com",
});

user.create({
  name: "Mario",
  photo: "/desktop/images/dog.png",
  email: "mario123@gmail.com",
});

user.read();
user.readOne(2);
