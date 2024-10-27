// routes-Index.ts

import express from 'express';
import { AuthController } from '../controllers/AuthController';
import { ProdutoController } from '../controllers/ProdutoController';
import { UsuarioController } from '../controllers/UsuarioController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

const asyncHandler = (fn: any) => (req: express.Request, res: express.Response, next: express.NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.post('/register', UsuarioController.criarUsuario);
router.post('/login', asyncHandler(AuthController.login));

router.get('/usuarios', authMiddleware, asyncHandler(UsuarioController.listarUsuarios));
router.post('/usuarios', authMiddleware, asyncHandler(UsuarioController.criarUsuario));
router.get('/produtos', authMiddleware, asyncHandler(ProdutoController.listarProdutos));
router.post('/produtos', authMiddleware, asyncHandler(ProdutoController.criarProduto));
router.put('/produtos/:id', authMiddleware, asyncHandler(ProdutoController.atualizarProduto));
router.delete('/produtos/:id', authMiddleware, asyncHandler(ProdutoController.deletarProduto));

export default router;


