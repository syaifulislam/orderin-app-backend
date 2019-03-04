'use strict'
const RoleUser = use('App/Models/RoleUser');

class RoleUserController {
    async index ({response}) {
        let data = await RoleUser.all()
        return response.json({status: "OK", message: "success",code:200,data:data})
    }
}

module.exports = RoleUserController
