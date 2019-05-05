import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Student, { schema } from './model'

const router = new Router()
const { title, content } = schema.tree

/**
 * @api {post} /Students Create student
 * @apiName CreateStudent
 * @apiGroup Student
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam title Student's title.
 * @apiParam content Student's content.
 * @apiSuccess {Object} student Student's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Student not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ title, content }),
  create)

/**
 * @api {get} /Students Retrieve students
 * @apiName RetrieveStudents
 * @apiGroup Student
 * @apiUse listParams
 * @apiSuccess {Object[]} students List of students.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /Students/:id Retrieve student
 * @apiName RetrieveStudent
 * @apiGroup Student
 * @apiSuccess {Object} student Student's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Student not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /Students/:id Update student
 * @apiName UpdateStudent
 * @apiGroup Student
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam title Student's title.
 * @apiParam content Student's content.
 * @apiSuccess {Object} student Student's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Student not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ title, content }),
  update)

/**
 * @api {delete} /Students/:id Delete student
 * @apiName DeleteStudent
 * @apiGroup Student
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Student not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
