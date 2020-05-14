import test from 'japa'
import supertest from 'supertest'
const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`
const request = supertest(BASE_URL)
import User from 'App/Models/User'
import db from '@ioc:Adonis/Lucid/Database'

test.group('Demo Tests', (group) => {
  group.before(() => {
  })
  group.beforeEach(() => {
  })
  group.after(async () => {
  })
  group.afterEach(async () => {
    db.connection().truncate('users', true)
  })

  test('sum 2+2', (assert) => {
    assert.deepEqual(2 + 2, 4)
  })

  test('404 route doesn\'t exist', async (assert) => {
    const { text } = await supertest(BASE_URL).get('/thisRouteDoesntExist').expect(404)
    assert.exists(text, 'handled E_ROUTE_NOT_FOUND: Cannot GET:/asdlas')
  })

  test('health check route is working', async (assert) => {
    const {status, text} = await supertest(BASE_URL).get('/health')
    assert.equal(status, 200)
    assert.exists(text, '"healthy":true')
  })

  test('should be able to login and get a JWT Token', async (assert) => {
    interface LoginDto {
      user: {
        id: string
        name: string
        email: string
      },
      token: {
        expiresIn: number
        token: string
      }
    }
    const credentials = {
      email: 'gustavo@hublaw.com.br', password: '123456',
    }
    await User.create({name: 'Gustavo Lopes', ...credentials})

    const response = await request.post('/auth/login').send(credentials)
    const body: LoginDto = response.body
    const status = response.status

    assert.equal(status, 200)
    assert.exists(body.user.id)
    assert.deepEqual(body.user.email, credentials.email)
    assert.exists(body.token.token)
  })
})
