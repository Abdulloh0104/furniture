import { utilities as nestWinstonModuleUtilitie } from "nest-winston";
import * as winston from "winston";

export const winstonConfig = {
  transports: [
    // new winston.transports.Console({
    //   format: winston.format.combine(
    //     // winston.format.label({ label: "Prismajon" }),
    //     winston.format.timestamp(),
    //     nestWinstonModuleUtilitie.format.nestLike("Prismajon")
    //     // winston.format.printf(({ level, message, label, timestamp }) => {
    //     //   return `${timestamp} [${label}] ${level} ${message}`;
    //     // })
    //   ),
    // }
    // ),
    new winston.transports.File({
      filename: "logs/combine.log",
      level: "info",
      format: winston.format.combine(
        winston.format.label({ label: "Furniture" }),
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
      format: winston.format.combine(
        winston.format.label({ label: "Prismajon" }),
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
  ],
};
