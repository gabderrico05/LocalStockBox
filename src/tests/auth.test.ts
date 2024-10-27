// tests/auth.test.ts
import request from 'supertest';
import app from '../server';

describe('Teste de Registro e Login', () => {
  it('Deve registrar um novo usuário', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({
        nome: 'Carlos Silva',
        email: 'carlos@email.com',
        senha: 'senha123'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('Deve fazer login com sucesso', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({
        email: 'carlos@email.com',
        senha: 'senha123'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('Não deve fazer login com senha incorreta', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({
        email: 'carlos@email.com',
        senha: 'senha_errada'
      });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Credenciais inválidas.');
  });
});
