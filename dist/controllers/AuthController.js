"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Database_1 = __importDefault(require("../services/Database"));
const SECRET_KEY = 'sua_chave_secreta';
class AuthController {
    static async login(req, res) {
        try {
            const { email, senha } = req.body;
            console.log('Email recebido:', email);
            const [rows] = await Database_1.default.getConnection().query('SELECT * FROM usuarios WHERE email = ?', [email]);
            console.log('Usuário encontrado:', rows);
            const usuario = rows[0];
            if (!usuario) {
                console.log('Usuário não encontrado.');
                return res.status(401).json({ message: 'Credenciais inválidas.' });
            }
            const senhaValida = await bcrypt_1.default.compare(senha, usuario.senha_hash);
            console.log('Senha válida:', senhaValida);
            if (!senhaValida) {
                return res.status(401).json({ message: 'Credenciais inválidas.' });
            }
            const token = jsonwebtoken_1.default.sign({ idUsuario: usuario.id_usuario, idEmpresa: usuario.id_empresa }, SECRET_KEY, { expiresIn: '8h' });
            console.log('Token gerado com sucesso:', token);
            return res.status(200).json({ token });
        }
        catch (error) {
            console.error('Erro ao fazer login:', error);
            return res.status(500).json({ error: 'Erro ao fazer login.' });
        }
    }
}
exports.AuthController = AuthController;
