"use strict";
// models-Usuario.ts
Object.defineProperty(exports, "__esModule", { value: true });
class Usuario {
    id;
    nome;
    email;
    senhaHash;
    tipo;
    status;
    dataCriacao;
    idEmpresa;
    idUnidade;
    constructor(id, nome, email, senhaHash, tipo, status, dataCriacao, idEmpresa, idUnidade) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senhaHash = senhaHash;
        this.tipo = tipo;
        this.status = status;
        this.dataCriacao = dataCriacao;
        this.idEmpresa = idEmpresa;
        this.idUnidade = idUnidade;
    }
}
exports.default = Usuario;
