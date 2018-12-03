var expect = require('expect');

var {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'Jen';
    var text = 'Some message';
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, text});
  });
});

describe('generateLocationMessage',()=>{
  it('should generate correct location object',()=>{
    var from ='Deb';
    var lat=12;
    var long=23;
    var url='https://www.google.com/maps?q=12,23';
    message=generateLocationMessage(from,lat,long);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from,url});
  });
});
