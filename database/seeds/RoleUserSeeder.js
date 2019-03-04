'use strict'

/*
|--------------------------------------------------------------------------
| RoleUserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class RoleUserSeeder {
  async run () {
    var datetime = require('node-datetime')
    var dt = datetime.create();
    const roleUser1 = await Database.table('role_users').insert({
      name:"User",
      created_at:dt.format('Y-m-d H:i:s'),
      updated_at:dt.format('Y-m-d H:i:s')
    })

    const roleUser2 = await Database.table('role_users').insert({
      name:"Food Server",
      created_at:dt.format('Y-m-d H:i:s'),
      updated_at:dt.format('Y-m-d H:i:s')
    })
  }
}

module.exports = RoleUserSeeder
