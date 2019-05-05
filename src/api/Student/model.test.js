import { Student } from '.'
import { User } from '../user'

let user, student

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  student = await Student.create({ creator: user, title: 'test', content: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = student.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(student.id)
    expect(typeof view.creator).toBe('object')
    expect(view.creator.id).toBe(user.id)
    expect(view.title).toBe(student.title)
    expect(view.content).toBe(student.content)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = student.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(student.id)
    expect(typeof view.creator).toBe('object')
    expect(view.creator.id).toBe(user.id)
    expect(view.title).toBe(student.title)
    expect(view.content).toBe(student.content)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
