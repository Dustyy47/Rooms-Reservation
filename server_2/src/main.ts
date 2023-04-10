import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

const PORT = 5000

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
        })
    )

    const config = new DocumentBuilder()
        .setTitle('SevSU Room reservation application')
        .setDescription('API description')
        .setVersion('1.0')
        .addTag('sevsu')
        .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api', app, document)

    await app.listen(PORT)
    console.log('Application started on Port ' + PORT)
}
bootstrap()
