// controllers-UsuarioController.ts

import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import Database from '../services/Database';

export class UsuarioController {
  public static async criarUsuario(req: Request, res: Response): Promise<void> {
    const { nome, email, senha, tipo = 'funcionario' } = req.body;

    if (!nome || !email || !senha) {
      res.status(400).json({ error: 'Nome, email e senha são obrigatórios.' });
      return;
    }

    try {
      const senhaHash = await bcrypt.hash(senha, 10);

      const query = `
        INSERT INTO usuarios (nome, email, senha_hash, tipo_usuario) 
        VALUES (?, ?, ?, ?)
      `;
      const [result] = await Database.getConnection().execute(query, [
        nome,
        email,
        senhaHash,
        tipo,
      ]);

      res.status(201).json({ id: (result as any).insertId });
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      res.status(500).json({ error: 'Erro ao criar usuário.' });
    }
  }


  public static async listarUsuarios(req: Request, res: Response) {
    try {
      const [rows] = await Database.getConnection().query('SELECT * FROM usuarios');
      res.status(200).json(rows);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar usuários.' });
    }
  }
}

