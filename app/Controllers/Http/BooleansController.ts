import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class BooleansController {

  public async validateBoolean(ctx: HttpContextContract) {
    const { request } = ctx;

    const validationSchema = schema.create({
      // Valida dados do tipo boolean.
      /**
       * Aceita:
       * true | false
       * 1 | 0
       * "1" | "0"
       * "true" | "false"
       */
      value: schema.boolean()
    })

    await request.validate({
      schema: validationSchema
    });

    return { success: true }
  }
}
