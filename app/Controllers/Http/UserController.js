'use strict'
const User = use('App/Models/User');
const { validate } = use('Validator');

class UserController {
    async register ({request,auth,response}) {
        const rules = {
          email     : 'required',
          username  : 'required',
          password  : 'required',
          role_id   : 'required'
        }
        const validation = await validate(request.all(), rules)
        if (validation.fails()) {
          return response.json({status: 'Form Validation Error', message: "fail",code:401})
        }
        const email = request.input("email")
        const username = request.input("username")
        const password = request.input("password")
        const roleID = request.input("role_id")

        let user = new User()
        user.username = username
        user.email = email
        user.password = password
        user.role_id = roleID

        user = await user.save()

        response.json({status: "OK", message: "success",code:200})
    }

    async login({request, auth, response}) {
        const username = request.input("username")
        const password = request.input("password");
        try {
          if (await auth.attempt(username, password)) {
            let user = await User.findBy('username', username)
            let roleUser = await user.roleUser().fetch()
            let accessToken = await auth.generate(user)
            return response.json({user:user, roleUser:roleUser, access_token: accessToken,code:200})
          }
        }
        catch (e) {
            return response.json({status: "User not found", message: "fail",code:404})          
        }
    }
}

module.exports = UserController
