const expect =require('expect');

const {Users} = require('./users')

describe('Users', () => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
        id: "1",
        name: "John",
        room: "Node",
      },{
        id: "2",
        name: "Faith",
        room: "Java",
      },{
        id: "3",
        name: "Kate",
        room: "Node",
      }];
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'John',
      room: 'The Office Fans'
    }
    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should find user', () => {
    var userId  = '2';
    var user = users.getUser(userId);

    expect(user.id).toBe(userId);
  })
  
  it('should not find user', () => {
    var userId  = '10';
    var user = users.getUser(userId);

    expect(user).toBeUndefined();
  })

  it('should remove a user', () => {
    var userId = '1';
    var user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  })

  it('should not remove a user', () => {
    var userId = '12';
    var user = users.removeUser(userId);

    expect(user).toBeUndefined();
    expect(users.users.length).toBe(3);
  })

  it('should return names for node course', () => {
    var userList = users.getUserList('Node');

    expect(userList).toEqual(['John', 'Kate'])
  });

  it('should return names for Java course', () => {
    var userList = users.getUserList('Java');

    expect(userList).toEqual(['Faith'])
  })
})
