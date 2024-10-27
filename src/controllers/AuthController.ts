// controllers-AuthController
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Database from '../services/Database';

const SECRET_KEY = 'sua_chave_secreta';

export class AuthController {
  public static async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, senha } = req.body;
      console.log('Email recebido:', email);

      const [rows]: any = await Database.getConnection().query(
        'SELECT * FROM usuarios WHERE email = ?',
        [email]
      );
      console.log('Usuário encontrado:', rows);

      const usuario = rows[0];

      if (!usuario) {
        console.log('Usuário não encontrado.');
        return res.status(401).json({ message: 'Credenciais inválidas.' });
      }

      const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);
      console.log('Senha válida:', senhaValida);

      if (!senhaValida) {
        return res.status(401).json({ message: 'Credenciais inválidas.' });
      }

      const token = jwt.sign(
        { idUsuario: usuario.id_usuario, idEmpresa: usuario.id_empresa },
        SECRET_KEY,
        { expiresIn: '8h' }
      );

      console.log('Token gerado com sucesso:', token);
      return res.status(200).json({ token });
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return res.status(500).json({ error: 'Erro ao fazer login.' });
    }
  }
}
