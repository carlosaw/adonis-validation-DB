import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class DatesController {

  public async validateDates(ctx: HttpContextContract) {

    const { request } = ctx;

    const validationSchema = schema.create({
      date: schema.date({
        // Formato padrão de data do Adonis
        // format:"yyyy-MM-dd"
        // Formato Brasileiro
        format: "dd/MM/yyyy HH:mm:ss"
      })
    })

    await request.validate({
      schema: validationSchema
    });

    return { success: true }
  }
}
