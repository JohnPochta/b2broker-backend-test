import { LoggerService } from '@nestjs/common';

export class LoggerProvider implements LoggerService {
  constructor(
    private readonly appName: string,
  ) {}

  log(message: string, context?: string) {
    console.log(`[${this.appName}] ${context ? `[${context}] ` : ''}${message}`);
  }

  error(message: string, trace?: string, context?: string) {
    console.error(`[${this.appName}] ${context ? `[${context}] ` : ''}${message}`);
    if (trace) {
      console.error(trace);
    }
  }

  warn(message: string, context?: string) {
    console.warn(`[${this.appName}] ${context ? `[${context}] ` : ''}${message}`);
  }

  debug(message: string, context?: string) {
    console.debug(`[${this.appName}] ${context ? `[${context}] ` : ''}${message}`);
  }

  verbose(message: string, context?: string) {
    console.log(`[${this.appName}] ${context ? `[${context}] ` : ''}${message}`);
  }
} 