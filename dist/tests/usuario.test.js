"use strict";
// tests-usuario.test.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
describe('Teste das Rotas de Usuário', () => {
    it('Deve listar todos os usuários', async () => {
        const res = await (0, supertest_1.default)(server_1.default).get('/api/usuarios');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });
    it('Deve criar um novo usuário', async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .post('/api/usuarios')
            .send({
            nome: 'João Silva',
            email: 'joao@email.com',
            senhaHash: 'senha123',
            tipo: 'gerente',
        });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
    });
});
