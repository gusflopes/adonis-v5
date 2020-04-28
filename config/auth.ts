const authConfig = {
  secret: process.env.APP_KEY || 'some_secret_really_secret',
  expiresIn: process.env.JWT_EXP || 60*60,
}

export default authConfig
