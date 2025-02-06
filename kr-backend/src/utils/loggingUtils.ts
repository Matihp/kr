export class Logger {
    private context: string;
  
    constructor(context: string) {
      this.context = context;
    }
  
    private getTimestamp(): string {
      return new Date().toISOString();
    }
  
    private formatMessage(level: string, message: string, meta?: any): string {
      const timestamp = this.getTimestamp();
      const metaStr = meta ? ` - ${JSON.stringify(meta)}` : '';
      return `[${timestamp}] ${level} [${this.context}] ${message}${metaStr}`;
    }
  
    info(message: string, meta?: any): void {
      console.log(this.formatMessage('INFO', message, meta));
    }
  
    error(message: string, meta?: any): void {
      console.error(this.formatMessage('ERROR', message, meta));
    }
  
    warn(message: string, meta?: any): void {
      console.warn(this.formatMessage('WARN', message, meta));
    }
  
    debug(message: string, meta?: any): void {
      console.debug(this.formatMessage('DEBUG', message, meta));
    }
  }
