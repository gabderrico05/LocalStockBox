// controllers-ProdutoController.ts

import { Request, Response } from 'express';
import Database from '../services/Database';

export class ProdutoController {
  public static async listarProdutos(req: Request, res: Response): Promise<void> {
    try {
      const [rows] = await Database.getConnection().query(
        'SELECT * FROM produtos WHERE id_empresa = ?',
        [req.idEmpresa]
      );
      res.status(200).json(rows);  
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar produtos.' });
    }
  }

  public static async criarProduto(req: Request, res: Response): Promise<void> {
    const { nome, descricao, dataValidade, idCategoria, idEmpresa } = req.body;
    try {
      const query = `
        INSERT INTO produtos (nome_produto, descricao, data_validade, id_categoria, id_empresa) 
        VALUES (?, ?, ?, ?, ?)`;
      const [result] = await Database.getConnection().execute(query, [
        nome, descricao, dataValidade, idCategoria, idEmpresa
      ]);
      res.status(201).json({ id: (result as any).insertId });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar produto.' });
    }
  }

  public static async atualizarProduto(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { nome, descricao, dataValidade, idCategoria } = req.body;
    try {
      const query = `
        UPDATE produtos 
        SET nome_produto = ?, descricao = ?, data_validade = ?, id_categoria = ? 
        WHERE id_produto = ?`;
      const [result] = await Database.getConnection().execute(query, [
        nome, descricao, dataValidade, idCategoria, id
      ]);

      if ((result as any).affectedRows === 0) {
        res.status(404).json({ message: 'Produto não encontrado.' });
        return;  
      }

      res.status(200).json({ message: 'Produto atualizado com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar produto.' });
    }
  }

  public static async deletarProduto(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const query = 'DELETE FROM produtos WHERE id_produto = ?';
      const [result] = await Database.getConnection().execute(query, [id]);

      if ((result as any).affectedRows === 0) {
        res.status(404).json({ message: 'Produto não encontrado.' });
        return; 
      }

      res.status(200).json({ message: 'Produto deletado com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar produto.' });
    }
  }
}
