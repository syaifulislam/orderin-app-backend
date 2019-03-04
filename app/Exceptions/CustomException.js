'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class CustomException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  // handle () {}
  handle (error, { response }) {
    response.json(500).send("error")
  }
}

module.exports = CustomException
