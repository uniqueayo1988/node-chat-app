[{
  id: "asdsdfdds",
  name: "Ade",
  room: "A"
}]

// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(Room)

class Users {
  constructor () {
    this.users = []
  }

  addUser (id, name, room) {
    var user = {id, name, room}
    this.users.push(user)

    return user;
  }
}

module.exports = {Users}

const test = new Users();

console.log(test.users)

// class Person {
//   constructor (name, age) {
//     this.name = name;
//     this.age = age;
//     console.log(name, age)
//   }

//   getDesc () {
//     return `I am ${this.name} and I am ${this.age} year(s) old`;
//   }
// }

// const me = new Person('Ade', 24)
// console.log('this.name', me.name)
// // console.log(me.getDesc())
