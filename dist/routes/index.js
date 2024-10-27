"use strict";
// routes-Index.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../controllers/AuthController");
const ProdutoController_1 = require("../controllers/ProdutoController");
const UsuarioController_1 = require("../controllers/UsuarioController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
// Função para lidar com funções assíncronas no Express
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
// Rota pública: Login
router.post('/login', asyncHandler(AuthController_1.AuthController.login));
// Rotas protegidas com middleware de autenticação
router.get('/usuarios', authMiddleware_1.authMiddleware, asyncHandler(UsuarioController_1.UsuarioController.listarUsuarios));
router.post('/usuarios', authMiddleware_1.authMiddleware, asyncHandler(UsuarioController_1.UsuarioController.criarUsuario));
router.get('/produtos', authMiddleware_1.authMiddleware, asyncHandler(ProdutoController_1.ProdutoController.listarProdutos));
router.post('/produtos', authMiddleware_1.authMiddleware, asyncHandler(ProdutoController_1.ProdutoController.criarProduto));
router.put('/produtos/:id', authMiddleware_1.authMiddleware, asyncHandler(ProdutoController_1.ProdutoController.atualizarProduto));
router.delete('/produtos/:id', authMiddleware_1.authMiddleware, asyncHandler(ProdutoController_1.ProdutoController.deletarProduto));
exports.default = router;
