import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class StringsController {
  public async validateString(ctx: HttpContextContract) {
    // Desestruturando ctx para pegar o ctx.request().
    let {request} = ctx;

    // Criando o Schema de validação
    let schemaString = schema.create ({
      // Verifica se um dado é ou não é uma string
      isIstring:schema.string(),
      // Verifica se é uma string, mas deixa o dado como opcional.
      stringOptional: schema.string.optional(),
      // Verifica se é uma string mas aceita valor nulo
      stringNull: schema.string.nullable(),
      // Verifica se é uma string aceitando null e permitindo opcional.
      stringNullAndOptional: schema.string.nullableAndOptional(),
    });

    await request.validate({
      schema: schemaString
    })

    return {response: 'success'}
  }

  public async validateStringWithRules(ctx: HttpContextContract) {
    // Desestruturando ctx para pegar o ctx.request().
    let {request} = ctx;

    const rulesSchema = schema.create({
      // Permitir apenas caracteres do alfabeto (Alfa)
      alpha: schema.string([
        rules.alpha()
      ]),

      // Permitir apenas caracteres alfanuméricos
    //   alphaNum: schema.string([
    //     rules.alphaNum()
    //   ]),

      // Validar o tamanho da string
      strlen: schema.string([
        rules.minLength(3),
        rules.maxLength(5)
      ]),
      // Retirar espaços em branco do início e do fim da string
      trim: schema.string([
        rules.trim()
      ]),
      // Escapa caracteres especiais para evitar SQLInjection
      escape: schema.string([
        rules.escape()
      ]),
      // Verifica se é um endereço de IP válido
      ip: schema.string([
        rules.ip()
      ]),
      // Verificar se um determinado dado é um email
      email: schema.string([
        rules.email()
      ])

    })
    await request.validate({
      schema: rulesSchema
    })
    return {response: 'success'}
  }

  public async validateStringWithDatabase(ctx: HttpContextContract) {
    // Desestruturando ctx para pegar o ctx.request().
    let {request} = ctx;
    // Criando o Schema de validação.
    const rulesSchema = schema.create ({
      name: schema.string(),
      // Verifica se o email é unico.
      email: schema.string({}, [
        rules.email(),
        rules.unique({table: 'users', column: 'email'})
      ]),
      // Verifica se o usuario de indicação existe.
      affiliateEmail: schema.string({}, [
        //rules.affiliateEmail(),
        rules.exists({table: 'users', column: 'email'})
      ]),
      // Verificar buscando por um campo _confirmation.
      password: schema.string({}, [
        rules.required(),
        rules.minLength(6),
        rules.maxLength(25),
        rules.confirmed()
      ])
    });
      await request.validate({
        schema: rulesSchema
      });
    return { success: true }
  }

  public async validateStringWithEquals(ctx: HttpContextContract) {
    const {request} = ctx;

    const validationSchema = schema.create({
        // Verifica se o username é igual a Carlos
        username: schema.string({}, [
          rules.equalTo('Carlos')  
        ]),
        // Verifica se o campo type NÃO é igual a determinado valor.
        type: schema.string({}, [
            rules.notIn(['ADMIN', 'TESTER'])
        ])
    })
    await request.validate({
        schema: validationSchema
    });
    return { success: true }
  }
}