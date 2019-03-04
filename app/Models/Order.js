'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Order extends Model {
    User () {
        return this.hasOne('App/Models/User','user_id','id')
    }

    OrderDetail () {
        return this.hasMany('App/Models/OrderDetail','id','order_id')
    }
}

module.exports = Order
