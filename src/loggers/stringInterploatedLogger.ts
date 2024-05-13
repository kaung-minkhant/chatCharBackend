import winston from "winston";

const {combine, splat, simple} = winston.format
const {Console, File} = winston.transports

const ignorePrivate = winston.format((info, opts) => {
  if (info.private) {
    return false
  }
  return info
})

winston.loggers.add('sil', {
  level: 'info',
  format: combine(
    ignorePrivate(),
    splat(),
    simple(),
  ),
  transports: [
    new Console(),
    // new File({filename: "info.log", level: 'info'}),
    // new File({filename: 'errors.log', level: 'error'})
  ],
})