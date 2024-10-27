"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// tests/auth.test.ts
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
describe('Testes de Login', () => {
    it('Deve fazer login e retornar um token', async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .post('/api/login')
            .send({ email: 'joao@email.com', senha: 'senha123' });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
    });
    it('Deve falhar com credenciais inválidas', async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .post('/api/login')
            .send({ email: 'joao@email.com', senha: 'senha_errada' });
        expect(res.statusCode).toBe(401);
        expect(res.body.message).toBe('Credenciais inválidas.');
    });
});
