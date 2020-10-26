import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as helmet from 'helmet'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({ origin: process.env.CLIENT_URL, credentials: true })
  if (process.env.NODE_ENV === 'production') app.use(helmet()) // a collection of 14 smaller middleware that sets security-relatedd HTTP headers

  await app.listen(process.env.SERVER_PORT)
}
bootstrap()
