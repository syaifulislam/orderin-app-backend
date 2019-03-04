'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderDetailSchema extends Schema {
  up () {
    this.create('order_details', (table) => {
      table.increments()
      table.integer('order_id').notNullable()
      table.string('food_name',255).notNullable()
      table.integer('quantity').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('order_details')
  }
}

module.exports = OrderDetailSchema
