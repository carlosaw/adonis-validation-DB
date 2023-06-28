import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class ArraysController {
  
    public async validateArray(ctx: HttpContextContract) {
      // Desestruturando ctx para pegar o ctx.request().
    let {request} = ctx;

    // Criando o Schema de validação
    let schemaArray = schema.create ({
      // numbers: schema.array().members(schema.number()),
      // strings: schema.array().members(schema.string()),
      objects: schema.array().members(schema.object().members({
        name: schema.string(),
        age: schema.number()
      })),
      // Aceita qualquer tipo de array.
      // anys: schema.array().anyMembers()
    });

    const validated = await request.validate({
      schema: schemaArray
    })

    return {response: 'success', data: validated}
    }
}
