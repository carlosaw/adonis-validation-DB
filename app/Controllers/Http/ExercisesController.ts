import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class ExercisesController {
  /*
   *  username e  password são obrigatórios
   *  a idade (age) do usuário deve ser um number e não pode ser menor que 18
   *  password deve ter entre 6 e 12 caracteres
   *  sex deve aceitar somente tipo M e F
   */
  public async validateN1(ctx: HttpContextContract) {
    const { request } = ctx

    const exerciseSchema = schema.create({
      username: schema.string(),
      password: schema.string([rules.minLength(6), rules.maxLength(12)]),
      age: schema.number([rules.range(18, 150)]),
      sex: schema.enum(['M', 'F'] as const),
    })

    const validated = await request.validate({
      schema: exerciseSchema,
    })

    return { response: 'success', validated }
  }

  /*
   * username e  password são obrigatórios
   * o usuário tem que ter 18 anos ou mais (birthdate)
   * password deve ter entre 6 e 12 caracteres
   * sex deve aceitar somente tipo M e F
   * isAdmin deve aceitar somente os valores true ou false
   */
  public async validateN2(ctx: HttpContextContract) {
    const { request } = ctx

    const exerciseSchema = schema.create({
      username: schema.string(),
      password: schema.string([rules.minLength(6), rules.maxLength(12)]),
      birthdate: schema.date({format: "dd/MM/yyyy"}, [rules.before(18, 'years')]),
      sex: schema.enum(['M', 'F'] as const),
      isAdmin: schema.boolean(),
      rules: schema.array().members(schema.number([rules.notIn([2])])),
    })

    const validated = await request.validate({
      schema: exerciseSchema,
    })

    return { response: 'success', validated }
  }

  /**
   * carrinho de compras chamado cart com pedidos de uma loja virtual
   * cada pedido deve ter pelo menos um item associado
   * o prazo de entrega informado dev ser de pelo menos cinco dias após a data do pedido
   * o pedido dever ter um endereço de entrega cadastrado
   * o pedido deve ter um usuário associado
   * cada item deve ter um id do tipo number
   * o ip do usuário de ve ser salvo no pedido
   */
  public async validateN3(ctx: HttpContextContract) {
    const { request } = ctx

    const exerciseSchema = schema.create({
      cart: schema.object().members({
        orders: schema.array().members(
          schema.object().members({
            id: schema.enum([1, 2, 3, 4, 7, 12, 122] as const),
            quantity: schema.number(),
          })
        ),
        delivery: schema.date({format: "dd/MM/yyyy"}, [rules.before(-5, 'days')]),
        address: schema.object().members({
          city: schema.string(),
          state: schema.string(),
        }),
        user: schema.object().members({
          ip: schema.string([rules.ip()]),
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
