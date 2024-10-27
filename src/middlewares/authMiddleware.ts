// middlewares-AuthMiddleware.ts

import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'sua_chave_secreta';

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Token não fornecido.' });
    return;  
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as any;
    req.idEmpresa = decoded.idEmpresa;
    next();  
  } catch (error) {
    console.error('Erro ao verificar o token:', error);
    res.status(401).json({ message: 'Token inválido.' });
  }
}



