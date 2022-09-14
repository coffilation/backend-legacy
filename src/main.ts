import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from 'app/app.module'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { TypeORMExceptionFilter } from 'app/typeorm-exception.filter'
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  )

  app.enableCors()

  const config = new DocumentBuilder().addBearerAuth().build()

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  app.useGlobalFilters(new TypeORMExceptionFilter())
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup(``, app, document, {
    uiConfig: {
      persistAuthorization: true,
      layout: `BaseLayout`,
      displayRequestDuration: true,
    },
  })

  await app.listen(8000, process.env.NEST_ADDRESS)
}
bootstrap()
