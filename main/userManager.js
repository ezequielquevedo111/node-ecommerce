class UserManager {
  static #users = [];
  create(data) {
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
  }
  read() {
    return UserManager.#users;
  }
  readOne(id) {
    return UserManager.#users.find((user) => user.id === id);
  }
}

const user = new UserManager({
  name: "Ezequiel",
  photo: "/desktop/images/background.png",
  email: "ezequielquevedo111@gmail.com",
});

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

console.log(user.read());
console.log(user.readOne(2));

// user.create({
//   name: "Mario",
//   photo: "/desktop/images/dog.png",
//   email: "mario123@gmail.com",
// });
// user.create({
//   name: "Paola",
//   photo: "/desktop/images/cat.png",
//   email: "paola12@gmail.com",
// });
