'use strict'
const Order = use('App/Models/Order')

class FoodServerController {
    async index ({response}) {
        let orderWaiting = await Order.query().with('OrderDetail').with('User').where('state','Waiting').orderBy('user_id','asc').orderBy('created_at','desc').fetch()
        let orderAccepted = await Order.query().with('OrderDetail').with('User').where('state','Accepted').orderBy('user_id','asc').orderBy('created_at','desc').fetch()
        let orderRejected = await Order.query().with('OrderDetail').with('User').where('state','Rejected').orderBy('user_id','asc').orderBy('created_at','desc').fetch()
        let arrayResponse = {
            waiting     :   orderWaiting,
            accepted    :   orderAccepted,
            rejected    :   orderRejected
        }
        return response.json({status: "OK", message: "success",code: 200, data: arrayResponse})
    }

    async approval ({request,auth,response,params}) {
        if (await auth.current.user.role_id != 2) {
            return response.json({status: "Not Food Server", message: "fail",code:401})
        }
        let orderID = request.input('order_id')
        let order = await Order.find(orderID)
        if (params.state == 'approve') {
            order.state = 'Accepted'
        }else {
            order.state = 'Rejected'
        }
        order.save()
        return response.json({status: "OK", message: "success",code: 200, data: request.all()})
    }
}

module.exports = FoodServerController
