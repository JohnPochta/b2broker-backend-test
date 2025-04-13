import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

@Injectable()
export class ConfigService {
  constructor() {
    dotenv.config();
  }

  get(key: string): string {
    return process.env[key];
  }

  getOrThrow(key: string): string {
    const value = this.get(key);
    if (!value) {
      throw new Error(`Config key "${key}" is not defined`);
    }
    return value;
  }
} 