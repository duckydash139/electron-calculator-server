import Joi from 'joi'

import drive from './controllers'

export default [
  {
    // regis client and save
    method: 'POST',
    path: '/storage',
    config: {
      handler: drive.create,
      description: 'Sign up new client',
      notes:
        'Signs up the new client by passing client_id and data in the request body',
      tags: ['api'],
      validate: {
        payload: {
          client_id: Joi.string()
            .required()
            .description('the client_id to find data'),
          file: Joi.object({
            a: Joi.number()
              .required()
              .description('first value'),
            b: Joi.number()
              .required()
              .description('second value'),
            operator: Joi.string()
              .valid(['add', 'substract', 'multiply', 'divide', 'power'])
              .required()
              .description('operator'),
            result: Joi.any()
              .required()
              .description(`most are number except 'Cannot divide by 0' case`)
          }).required()
        }
      },
      response: {
        schema: Joi.object({
          success: Joi.boolean(),
          message: Joi.any()
        })
      }
    }
  },
  {
    // get saved data
    method: 'GET',
    path: '/storage/{id}',
    config: {
      handler: drive.find,
      description: 'Get client data',
      notes: 'Returns the data by the client_id passed in the path',
      tags: ['api'],
      validate: {
        params: {
          id: Joi.string()
            .required()
            .description('the client_id to find data')
        }
      },
      response: {
        schema: Joi.object({
          a: Joi.number(),
          b: Joi.number(),
          operator: Joi.string(),
          result: Joi.any()
        })
      }
    }
  },
  {
    // update saved data
    method: 'PUT',
    path: '/storage/{id}',
    config: {
      handler: drive.update,
      description: 'Update client data',
      notes: 'Updates the data by the client_id passed in the path',
      tags: ['api'],
      validate: {
        params: {
          id: Joi.string()
            .required()
            .description('the client_id to find data')
        },
        payload: {
          file: Joi.object({
            a: Joi.number()
              .required()
              .description('first value'),
            b: Joi.number()
              .required()
              .description('second value'),
            operator: Joi.string()
              .valid(['add', 'substract', 'multiply', 'divide', 'power'])
              .required()
              .description('operator'),
            result: Joi.any()
              .required()
              .description(`most are number except 'Cannot divide by 0' case`)
          }).required()
        }
      },
      response: {
        schema: Joi.object({
          success: Joi.boolean(),
          message: Joi.any()
        })
      }
    }
  },
  {
    // delete client data
    method: 'DELETE',
    path: '/storage/{id}',
    config: {
      handler: drive.remove,
      description: 'Delete client data',
      notes: 'Deletes the data by the client_id passed in the path',
      tags: ['api'],
      validate: {
        params: {
          id: Joi.string()
            .required()
            .description('the client_id to find data')
        }
      },
      response: {
        schema: Joi.object({
          success: Joi.boolean(),
          message: Joi.any()
        })
      }
    }
  }
]
