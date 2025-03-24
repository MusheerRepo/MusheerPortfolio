import winston from 'winston';
import { ICustomWorld } from '../support/cucumberWorld';

export class Logger {
    private worlObject: ICustomWorld;
    private logger: winston.Logger;

    constructor(worlObject: ICustomWorld, logger: winston.Logger) {
        this.worlObject = worlObject;
        this.logger = logger;
    }

    log(text: string, severity?: string) {
        this.worlObject.attach(text, 'text/plain');
        this.logger.log({
            level: severity || 'info',
            message: text,
        });
    }
}
