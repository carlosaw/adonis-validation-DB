import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class NumbersController {

  public async validateNumber(ctx: HttpContextContract) {
    const { request } = ctx;

    const validationSchema = schema.create({
      //value: schema.number()
      value: schema.number([
        rules.range(1800,2023)
      ])
    })

    await request.validate({
      schema: validationSchema
    });

    return { success: true }
  }
}
