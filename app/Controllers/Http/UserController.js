'use strict'
const User = use('App/Models/User');

class UserController {
    async register ({request,auth,response}) {
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
