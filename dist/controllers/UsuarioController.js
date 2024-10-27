"use strict";
// controllers-UsuarioController.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioController = void 0;
const Database_1 = __importDefault(require("../services/Database"));
class UsuarioController {
    static async listarUsuarios(req, res) {
        try {
            const [rows] = await Database_1.default.getConnection().query('SELECT * FROM usuarios');
            res.json(rows);
        }
        catch (error) {
            res.status(500).json({ error: 'Erro ao buscar usuários' });
        }
    }
    static async criarUsuario(req, res) {
        const { nome, email, senhaHash, tipo } = req.body;
        try {
            const query = `INSERT INTO usuarios (nome, email, senha_hash, tipo_usuario) VALUES (?, ?, ?, ?)`;
            const [result] = await Database_1.default.getConnection().execute(query, [nome, email, senhaHash, tipo]);
            res.status(201).json({ id: result.insertId });
        }
        catch (error) {
            res.status(500).json({ error: 'Erro ao criar usuário' });
        }
    }
}
exports.UsuarioController = UsuarioController;
