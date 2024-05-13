import './exampleLogger'
import './stringInterploatedLogger'

import winston from 'winston'

winston.exceptions.handle(new winston.transports.Console(), new winston.transports.File({filename: 'exceptions.log'}))
winston.rejections.handle(new winston.transports.Console(), new winston.transports.File({filename: 'rejections.log'}))
winston.exitOnError = false

export const ExampleLogger = winston.loggers.get('exampleLogger')
ExampleLogger.exitOnError = false;

export const SILogger = winston.loggers.get('sil')