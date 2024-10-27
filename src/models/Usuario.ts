// models-Usuario.ts

export default class Usuario {
  constructor(
    public id: number,
    public nome: string,
    public email: string,
    public senhaHash: string,
    public tipo: 'gerente' | 'funcionario',
    public status: 'ativo' | 'inativo',
    public dataCriacao: Date,
    public idEmpresa: number,  
    public idUnidade?: number   
  ) {}
}
