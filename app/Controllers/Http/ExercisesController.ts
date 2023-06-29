import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class ExercisesController {
  /*
   *1- username e  password são obrigatórios
   *2- password deve ter entre 6 e 12 caracteres
   *3- a idade (age) do usuário deve ser um number e não pode ser menor que 18
   *4- sex deve aceitar somente tipo M e F
   */
  public async validateN1(ctx: HttpContextContract) {
    const { request } = ctx

    const exerciseSchema = schema.create({
/*1*/ username: schema.string(),
/*2*/ password: schema.string([rules.minLength(6), rules.maxLength(12)]),
/*3*/ age: schema.number([rules.range(18, 150)]),
/*4*/ sex: schema.enum(['M', 'F'] as const),          
    })

    const validated = await request.validate({
      schema: exerciseSchema,
    })

    return { response: 'success', validated }
  }

  /*
   *1- username e  password são obrigatórios
   *2- o usuário tem que ter 18 anos ou mais (birthdate)
   *3- password deve ter entre 6 e 12 caracteres
   *4- sex deve aceitar somente tipo M e F
   *5- isAdmin deve aceitar somente os valores true ou false
   */
  public async validateN2(ctx: HttpContextContract) {
    const { request } = ctx

    const exerciseSchema = schema.create({
/*1*/ username: schema.string(),
/*2*/ password: schema.string([rules.minLength(6), rules.maxLength(12)]),
/*3*/ birthdate: schema.date({format: "dd/MM/yyyy"}, [rules.before(18, 'years')]),
/*4*/ sex: schema.enum(['M', 'F'] as const),
/*5*/ isAdmin: schema.boolean(),
/*6*/ rules: schema.array().members(schema.number([rules.notIn([2])])),
    })

    const validated = await request.validate({
      schema: exerciseSchema,
    })

    return { response: 'success', validated }
  }

  /**
   *1- carrinho de compras chamado cart com pedidos de uma loja virtual.
   *2- cada carrinho deve ter pelo menos um item associado.
   *3- cada item deve ter um id do tipo number.
   *4- o prazo de entrega informado deve ser de pelo menos cinco dias após a data do pedido.
   *5- o carrinho dever ter um endereço de entrega cadastrado.
   *6- o carrinho deve ter um usuário associado.
   
   *7- o ip do usuário deve ser salvo no carrinho.
   */
  public async validateN3(ctx: HttpContextContract) {
    const { request } = ctx

    const exerciseSchema = schema.create({
/*1*/ cart: schema.object().members({
/*2*/   orders: schema.array().members(
          schema.object().members({
/*3*/       id: schema.number(),
/*3*/     //id: schema.enum([1, 2, 3, 4, 7, 12, 122] as const),
            quantity: schema.number(),
          })
        ),
/*4*/ delivery: schema.date({format: "dd/MM/yyyy HH:mm:ss"}, [rules.before(-5, 'days')]),
/*5*/   address: schema.object().members({
          city: schema.string(),
          state: schema.string(),
        }),
/*6*/   user: schema.object().members({
/*7*/     ip: schema.string([rules.ip()]),
          name: schema.string(),
        }),
      }),
    })

    const validated = await request.validate({
      schema: exerciseSchema,
    })

    return { response: 'success', validated }
  }
}
