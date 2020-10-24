var expect = require('expect');

var { generateMessage } = require('./message')

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    var from = 'Ade'
    var text = 'Some message'
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeTruthy()
    expect(message).toMatchObject({from, text})
  })
})