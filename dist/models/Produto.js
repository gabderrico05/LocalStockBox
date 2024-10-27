"use strict";
// models-Produto.ts
Object.defineProperty(exports, "__esModule", { value: true });
class Produto {
    id;
    nome;
    descricao;
    dataValidade;
    idCategoria;
    idEmpresa;
    constructor(id, nome, descricao, dataValidade, idCategoria, idEmpresa) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.dataValidade = dataValidade;
        this.idCategoria = idCategoria;
        this.idEmpresa = idEmpresa;
    }
}
exports.default = Produto;
