// tests-usuario.test.ts

import request from 'supertest';
import app from '../server';

describe('Teste das Rotas de Usuário', () => {
  it('Deve listar todos os usuários', async () => {
    const res = await request(app).get('/api/usuarios');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('Deve criar um novo usuário', async () => {
    const res = await request(app)
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


