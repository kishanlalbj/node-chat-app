var expect = require('expect')

var { generateMessage } = require('./message');

describe('generateMessage',()=> {
    it('should generate correct message object', () => {
        var from = 1;
        var text = "dasdasdasd"
        var message = generateMessage(from,text)
        expect(typeof from).toBe('string')
        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from,text})

    })
})