import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import { BadRequestException, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { winstonConfig } from "./common/logger/winston.logger";
import { WinstonModule } from "nest-winston";
import { AllExceptionsFilter } from "./common/errors/error.handler";

async function start() {
  try {
    const PORT = process.env.API_PORT || 3030;
    const app = await NestFactory.create(AppModule, {
      logger: WinstonModule.createLogger(winstonConfig),
    });
    app.use(cookieParser());
    app.setGlobalPrefix("api");

    app.enableCors({
      origin: (origin, callback) => {
        const allowedOrigins = [
          "http://hospital:8000",
          "http://localhost:4000",
          "https://hospital.uz",
          "https://api/hospital.uz",
          "https://crm.vercel.app",
        ];
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new BadRequestException("Not allowad by CORS"));
        }
      },
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true, // cookie va header
    });

    app.useGlobalPipes(new ValidationPipe());
    const config = new DocumentBuilder()
      .setTitle("HOSPITAL")
      .setDescription("HOSPITAL REST API")
      .setVersion("1.0")
      .addTag(
        "NestJS",
        "Validation, swagger, sendMail, bot, SMS, Sequelize, Guard"
      )
      .addBearerAuth()
      .build();

    app.useGlobalFilters(new AllExceptionsFilter());
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api/docs", app, document);
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(PORT, () => {
      console.log(`Server is started at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
  
}
start();
