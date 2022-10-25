import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from 'app/app.module'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { TypeormErrorFilter } from 'app/filters/typeorm-error.filter'
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true, ignoreTrailingSlash: true }),
  )

  app.enableCors()

  const config = new DocumentBuilder()
    .setVersion(process.env.VERSION)
    .addBearerAuth()
    .build()

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  app.useGlobalFilters(new TypeormErrorFilter())
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup(``, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      layout: `BaseLayout`,
      displayRequestDuration: true,
    },
  })

  await app.listen(8000, process.env.NEST_ADDRESS)
}
bootstrap()
