// import User from 'App/Models/User'
declare module '@ioc:Adonis/Core/Request' {

  interface RequestContract {
    authenticated: {
      userId: string,
      // we can store the user here if we fetch it on a middleware, like an Authorization Middleware
      // user: User
    }
  }
}
