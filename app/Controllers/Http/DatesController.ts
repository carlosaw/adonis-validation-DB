import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class DatesController {

  public async validateDates(ctx: HttpContextContract) {

    const { request } = ctx;

    const validationSchema = schema.create({
      date: schema.date({
        // Formato padrão de data do Adonis
        // format:"yyyy-MM-dd"
        // Formato Brasileiro
        format: "dd/MM/yyyy"
      }, [
        // Verifica se a data é DEPOIS de hoje (No futuro).
        // rules.after('today')

        // Verifica se a data é ANTES de hoje (No passado).
        // rules.before('today')

        // Verifica se a data é ANTES de 1 ANO.
        // rules.before(1,'years')

        // Verifica se a data é depois de 10 DIAS.
        // rules.after(10,'days')

        // Verifica se a data é antes de 10 DIAS.
        rules.before(10,'days')
      ])
    })

    await request.validate({
      schema: validationSchema
    });

    return { success: true }
  }
}
