import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'

enum UserTypes {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export default class EnumsController {
  public async validateEnum(ctx: HttpContextContract) {
    const { request } = ctx;

    const validationSchema = schema.create({
      value: schema.enum(Object.values(UserTypes))
    })

    await request.validate({
      schema: validationSchema
    });

    return { success: true }
  }
}
