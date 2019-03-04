'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderSchema extends Schema {
  up () {
    this.create('orders', (table) => {
      table.increments()
      table.integer('user_id').notNullable()
      table.string('food_name',255).notNullable()
      table.integer('quantity').notNullable()
      table.enum('state', ['Waiting', 'Rejected', 'Accepted']).defaultTo('Waiting').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('orders')
  }
}

module.exports = OrderSchema
