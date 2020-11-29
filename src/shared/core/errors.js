import { v4 as uuidv4 } from 'uuid'

export const SEVERITY = {
    FATAL: 1,
    ERROR: 2,
    WARNING: 3,
    INFO: 4
}

export class Message {
    constructor(code, message, severity) {
        this.id = uuidv4();
        this.code = code;
        this.message = message;
        this.severity = severity;
        if (!this.severity) {
            this.severity = SEVERITY.INFO;
        }
    }
}

export class BusinessError extends Message {
    constructor(code, message) {
        super(code, message, SEVERITY.WARNING);
    }
}

export class TechnicalError extends Message {
    constructor(code, message) {
        super(code, message, SEVERITY.ERROR);
    }
}

export class FatalError extends Message {
    constructor(code) {
        super(code, "A fatal error occured. Application is not starting up.", SEVERITY.FATAL);
    }
}


