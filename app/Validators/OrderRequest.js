'use strict'

class OrderRequest {
  get rules () {
    return {
      food_name : 'required',
      quantity : 'required|integer'
    }
  }
  get messages () {
    return {
      'food_name.required'  : 'Food Name Required',
      'quantity.required'   : 'Quantity Required',
      'quantity.integer'    : 'Quantity Must Be Integer'
    }
  }
}

module.exports = OrderRequest
