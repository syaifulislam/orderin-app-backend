'use strict'

class IndexController {
    index ({request,response}) {
        response.json({
            data:"hello world"
        })
    }
}

module.exports = IndexController
