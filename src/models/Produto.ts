// models-Produto.ts

export default class Produto {
  constructor(
    public id: number,
    public nome: string,
    public descricao: string,
    public dataValidade: Date,
    public idCategoria: number,
    public idEmpresa: number  
  ) {}
}

  