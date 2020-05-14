import 'reflect-metadata'
import getPort from 'get-port'
import { configure } from 'japa'
import sourceMapSupport from 'source-map-support'

sourceMapSupport.install({ handleUncaughtExceptions: false })

configure({
  files: ['build/test/**/*.spec.js'],
  before: [async () => {
    const port = await getPort()
    process.env.PORT = String(port)
    process.env.DB_NAME = 'test'
    process.env.ENV_SILENT = 'true'
    process.env.NODE_ENV = 'testing'

    const { Ignitor } = await import('@adonisjs/core/build/src/Ignitor')
    await new Ignitor(__dirname).httpServer().start()
  }],
  after: [async () => {
    console.log('Tests finished.')
  }],
  bail: false,

})
