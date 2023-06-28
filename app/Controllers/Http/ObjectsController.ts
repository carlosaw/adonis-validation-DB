import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class ObjectsController {
  public async validateObject(ctx: HttpContextContract) {
    // Desestruturando ctx para pegar o ctx.request().
    let {request} = ctx;

    // Criando o Schema de validação
    let schemaObject = schema.create ({
      user: schema.object().members({
        id: schema.number(),
        name: schema.string(),
      }),
      
      address: schema.object().members({
        //state: schema.object().anyMembers()
        //state: schema.object.nullable().anyMembers()
        state: schema.object().members({
          name: schema.string(),
          city: schema.object().members({
            "name": schema.string()
          })
        }),  
      }),
      status: schema.string()
    });

    await request.validate({
      schema: schemaObject
    })

    return {response: 'success'}
  }

  public async showObjectRequest(ctx: HttpContextContract) {
    // Desestruturando ctx para pegar o ctx.request().
    let {request} = ctx;

    // Criando o Schema de validação
    let schemaObject = schema.create ({
      user: schema.object().members({
        name: schema.string(),
        id: schema.number()
      }),
    });
    const validated = await request.validate({
      schema: schemaObject
    })

    return validated;
  }

}