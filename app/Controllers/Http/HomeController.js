'use strict'
const Order = use('App/Models/Order')

class HomeController {
    async index ({auth,response}) {
        let ID = await auth.current.user.id
        let orderWaiting = await Order.query().with('OrderDetail').where('user_id',ID).where('state','Waiting').orderBy('created_at','desc').fetch()
        let orderAccepted = await Order.query().with('OrderDetail').where('user_id',ID).where('state','Accepted').orderBy('created_at','desc').fetch()
        let orderRejected = await Order.query().with('OrderDetail').where('user_id',ID).where('state','Rejected').orderBy('created_at','desc').fetch()
        let arrayResponse = {
            waiting     :   orderWaiting,
            accepted    :   orderAccepted,
            rejected    :   orderRejected
        }
        return response.json({status: "OK", message: "success",code: 200, data: arrayResponse})
    }
}

module.exports = HomeController
