'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.table('users', (table) => {
      table.integer('role_id').notNullable()
    })
  }

  down () {
    // this.table('users', (table) => {
    //   // reverse alternations
    // })
  }
}

module.exports = UserSchema
