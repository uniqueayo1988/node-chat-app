class Users {
  constructor () {
    this.users = []
    // this.users = [{
    //     id: "1",
    //     name: "John",
    //     room: "Node",
    //   },{
    //     id: "2",
    //     name: "Faith",
    //     room: "Java",
    //   },{
    //     id: "3",
    //     name: "Kate",
    //     room: "Node",
    //   }];
  }

  addUser (id, name, room) {
    var user = {id, name, room}
    this.users.push(user)

    return user;
  }

  getUser (id) {
    return this.users.filter((user) => user.id === id)[0]
  }

  removeUser (id) {
    var user = this.getUser(id)

    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
    }

    return user;
  }

  getUserList (room) {
    var users = this.users.filter((user) => user.room === room);
    var namesArray = users.map((user) => user.name);

    return namesArray;
  }
}

module.exports = {Users}

// const test = new Users();
// console.log(test.users)
// console.log(test.getUserList('Node'))

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
