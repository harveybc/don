'use strict'

const auth = use('basic-auth')
const User = use('App/Model/User')
const Hash = use('Hash')

class BasicAuth {

    * handle(request, response, next) {
        const credentials = auth(request.request)
        if (!credentials) {
            response.status(401).send({
                error: 'Please enter your account credentials'
            })
            return
        }
// CHECKING FOR USER INSIDE USERS TABLE
        const user = yield User
                .where('username', credentials.name)
                .first()
                .fetch()

        if (!user.size()) {
            response.status(401).send({
                error: 'Please enter your account credentials'
            })
            return
        }

        const userPassword = user.get('password')
        const result = yield Hash.verify(credentials.pass, userPassword)

        if (!result) {
            response.status(401).send({
                error: 'Password mismatch'
            })
            return
        }

        // it is important to yield next if authentication is successful.
        yield next

    }

}

module.exports = BasicAuth
