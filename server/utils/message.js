const moment = require('moment')

var generateMessage = (from,text) => ( 
     {
        from,
        text,
        createdAt: moment().format('LT')
    }
)

module.exports = {
    generateMessage: generateMessage
}
