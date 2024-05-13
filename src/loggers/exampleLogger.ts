import winston from "winston";

const {prettyPrint, simple, colorize, splat, label, timestamp, printf, errors, combine, json} = winston.format
const {Console, File} = winston.transports

const myFormat = printf(({level, label, message, timestamp}) => {
  return `${timestamp} [${label}] ${level}: ${message}`
})

winston.loggers.add('exampleLogger', {
  level: 'info',
  format: combine(
    // colorize(),
    simple(),
    errors({stack: true}),
    splat(),
    timestamp(),
    label({label: 'Example Service'}),
    myFormat,
  ),
  transports: [
    new Console(),
    new File({filename: "info.log", level: 'info'}),
    new File({filename: 'errors.log', level: 'error'})
  ],
})
