import * as chalk from 'chalk'

class Logger {
  static log(message: any) {
    return console.log(chalk.Color message)
  }
}

Logger.log("Hello World")