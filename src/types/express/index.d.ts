// types-index.d.ts

import { Request } from 'express';

declare module 'express' {
  export interface Request {
    idEmpresa?: number;
  }
}


