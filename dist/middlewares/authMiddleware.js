"use strict";
// middlewares-AuthMiddleware.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = 'sua_chave_secreta';
function authMiddleware(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'Token não fornecido.' });
        return; // Garante que não continue após a resposta
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        req.idEmpresa = decoded.idEmpresa; // Atribuindo ao request
        next(); // Continua para a próxima função no fluxo
    }
    catch (error) {
        console.error('Erro ao verificar o token:', error); // Para ajudar na depuração
        res.status(401).json({ message: 'Token inválido.' });
    }
}
