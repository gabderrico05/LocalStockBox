"use strict";
// controllers-ProdutoController.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdutoController = void 0;
const Database_1 = __importDefault(require("../services/Database"));
class ProdutoController {
    static async listarProdutos(req, res) {
        try {
            const [rows] = await Database_1.default.getConnection().query('SELECT * FROM produtos WHERE id_empresa = ?', [req.idEmpresa]);
            res.status(200).json(rows); // Não precisa de return aqui
        }
        catch (error) {
            res.status(500).json({ error: 'Erro ao listar produtos.' });
        }
    }
    static async criarProduto(req, res) {
        const { nome, descricao, dataValidade, idCategoria, idEmpresa } = req.body;
        try {
            const query = `
        INSERT INTO produtos (nome_produto, descricao, data_validade, id_categoria, id_empresa) 
        VALUES (?, ?, ?, ?, ?)`;
            const [result] = await Database_1.default.getConnection().execute(query, [
                nome, descricao, dataValidade, idCategoria, idEmpresa
            ]);
            res.status(201).json({ id: result.insertId });
        }
        catch (error) {
            res.status(500).json({ error: 'Erro ao criar produto.' });
        }
    }
    static async atualizarProduto(req, res) {
        const { id } = req.params;
        const { nome, descricao, dataValidade, idCategoria } = req.body;
        try {
            const query = `
        UPDATE produtos 
        SET nome_produto = ?, descricao = ?, data_validade = ?, id_categoria = ? 
        WHERE id_produto = ?`;
            const [result] = await Database_1.default.getConnection().execute(query, [
                nome, descricao, dataValidade, idCategoria, id
            ]);
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Produto não encontrado.' });
                return; // Garante o encerramento da execução
            }
            res.status(200).json({ message: 'Produto atualizado com sucesso.' });
        }
        catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar produto.' });
        }
    }
    static async deletarProduto(req, res) {
        const { id } = req.params;
        try {
            const query = 'DELETE FROM produtos WHERE id_produto = ?';
            const [result] = await Database_1.default.getConnection().execute(query, [id]);
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Produto não encontrado.' });
                return; // Garante o encerramento da execução
            }
            res.status(200).json({ message: 'Produto deletado com sucesso.' });
        }
        catch (error) {
            res.status(500).json({ error: 'Erro ao deletar produto.' });
        }
    }
}
exports.ProdutoController = ProdutoController;
