'use strict'
const OrderDetail = use('App/Models/OrderDetail')
const { validate } = use('Validator')
const Database = use('Database')

class OrderController {
    async store ({request,auth,response}) {
        let ID = await auth.current.user.id
        const rules = {
            food_name   : 'required',
            quantity    : 'required|integer'
        }
        try{
            const trx = await Database.beginTransaction()
            var datetime = require('node-datetime')
            var dt = datetime.create();
            const OrderID = await trx.insert({
                user_id     :   ID,
                created_at  :   dt.format('Y-m-d H:M:S'),
                updated_at  :   dt.format('Y-m-d H:M:S')
            }).into('orders')
            let length = Object.keys(request.all()).length
            if (length == 0) {
                await trx.rollback()
                return response.json({status: 'Data null', message: "fail",code:401})
            }
            const trxOrderDetail = await Database.beginTransaction()
            for (let i = 0; i < length ; i++){
                const validation = await validate(request.all()[i], rules)
                let foodName = request.all()[i].food_name
                let qty = parseInt(request.all()[i].quantity)
                if (qty <= 0){
                    await trxOrderDetail.rollback()
                    return response.json({status: "Quantity value error", message: "fail",code:401})
                }
                if (validation.fails()) {
                    await trxOrderDetail.rollback()
                    return response.json({status: 'Form Validation Error', message: "fail",code:401})
                }

                await trxOrderDetail.insert({
                    order_id    :   OrderID,
                    food_name   :   foodName,
                    quantity    :   qty,
                    created_at  :   dt.format('Y-m-d H:M:S'),
                    updated_at  :   dt.format('Y-m-d H:M:S')
                }).into('order_details')
            }
            await trx.commit()
            await trxOrderDetail.commit()
            return response.json({status: "OK", message: "success",code:200,data:request.all()})

        }catch(e){
            await trx.rollback()
            return response.json({status: 'Save Failed', message: "fail",code:401})
        }
    }
}

module.exports = OrderController
