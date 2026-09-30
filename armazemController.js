import { Produto } from "./produto.js";
import { Fornecedor } from "./fornecedor.js";

export class ArmazemController {
    #vetProdutos;
    #vetFornecedores;

    constructor() {
        this.#vetProdutos = [];
        this.#vetFornecedores = [];
    }

    #buscarProduto(descricao) {
        return this.#vetProdutos.find(produto =>
            produto.descricao.toUpperCase() == descricao.toUpperCase()
        );
    }

    #buscarFornecedor(cnpj) {
        return this.#vetFornecedores.find(fornecedor =>
            fornecedor.cnpj == cnpj
        );
    }

    #produtoDTO(produto) {
        let cnpjFornecedor = undefined;
        let razaoSocialFornecedor = undefined;
        if (produto.fornecedor != undefined) {
            cnpjFornecedor = produto.fornecedor.cnpj;
            razaoSocialFornecedor = produto.fornecedor.razaoSocial;
        }
        return {
            descricao: produto.descricao,
            precoCompra: produto.precoCompra,
            precoVenda: produto.precoVenda,
            quantidadeEstoque: produto.quantidadeEstoque,
            cnpjFornecedor: cnpjFornecedor,
            razaoSocialFornecedor: razaoSocialFornecedor
        };
    }

    #fornecedorDTO(fornecedor) {
        return {
            razaoSocial: fornecedor.razaoSocial,
            cnpj: fornecedor.cnpj,
            telefone: fornecedor.telefone,
            endereco: fornecedor.endereco,
            creditoDisp: fornecedor.creditoDisp
        };
    }

    cadastrarFornecedor(razaoSocial, cnpj, telefone, endereco, creditoDisp) {
        if (this.#buscarFornecedor(cnpj) != undefined) {
            return "FORNECEDOR_JA_CADASTRADO";
        }
        let fornecedor = new Fornecedor(
            razaoSocial, cnpj, telefone, endereco, Number(creditoDisp)
        );
        this.#vetFornecedores.push(fornecedor);
        this.salvarDados();
        return "SUCESSO";
    }

    excluirFornecedor(cnpj) {
        let fornecedor = this.#buscarFornecedor(cnpj);
        if (fornecedor == undefined) {
            return "FORNECEDOR_NAO_ENCONTRADO";
        }
        let produtoVinculado = this.#vetProdutos.find(produto =>
            produto.fornecedor != undefined &&
            produto.fornecedor.cnpj == cnpj
        );
        if (produtoVinculado != undefined) {
            return "FORNECEDOR_VINCULADO_A_PRODUTO";
        }
        let indice = this.#vetFornecedores.findIndex(item =>
            item.cnpj == cnpj
        );
        this.#vetFornecedores.splice(indice, 1);
        this.salvarDados();
        return "SUCESSO";
    }

    alterarFornecedor(cnpj, novosDados) {
        let fornecedor = this.#buscarFornecedor(cnpj);
        if (fornecedor == undefined) {
            return "FORNECEDOR_NAO_ENCONTRADO";
        }
        if (novosDados.razaoSocial != undefined && novosDados.razaoSocial != "") {
            fornecedor.razaoSocial = novosDados.razaoSocial;
        }
        if (novosDados.telefone != undefined && novosDados.telefone != "") {
            fornecedor.telefone = novosDados.telefone;
        }
        if (novosDados.endereco != undefined && novosDados.endereco != "") {
            fornecedor.endereco = novosDados.endereco;
        }
        if (novosDados.creditoDisp != undefined && novosDados.creditoDisp != "") {
            fornecedor.creditoDisp = Number(novosDados.creditoDisp);
        }

        this.salvarDados();
        return "SUCESSO";
    }

    consultarFornecedor(cnpj) {
        let fornecedor = this.#buscarFornecedor(cnpj);
        if (fornecedor == undefined) {
            return "FORNECEDOR_NAO_ENCONTRADO";
        }
        return this.#fornecedorDTO(fornecedor);
    }

    listarFornecedores() {
        let lista = [];
        for (let fornecedor of this.#vetFornecedores) {
            lista.push(this.#fornecedorDTO(fornecedor));
        }
        return lista;
    }

    filtrarFornecedoresPorCredito(creditoMinimo) {
        let lista = [];
        for (let fornecedor of this.#vetFornecedores) {
            if (fornecedor.creditoDisp > Number(creditoMinimo)) {
                lista.push(this.#fornecedorDTO(fornecedor));
            }
        }
        return lista;
    }

    cadastrarProduto(descricao, precoCompra, precoVenda, quantidadeEstoque, cnpjFornecedor) {
        if (this.#buscarProduto(descricao) != undefined) {
            return "PRODUTO_JA_CADASTRADO";
        }
        let produto = new Produto(
            descricao,
            Number(precoCompra),
            Number(precoVenda),
            Number(quantidadeEstoque)
        );
        if (cnpjFornecedor != undefined && cnpjFornecedor != "") {
            let fornecedor = this.#buscarFornecedor(cnpjFornecedor);
            if (fornecedor == undefined) {
                return "FORNECEDOR_NAO_ENCONTRADO";
            }
            produto.fornecedor = fornecedor;
        }
        this.#vetProdutos.push(produto);
        this.salvarDados();
        return "SUCESSO";
    }

    excluirProduto(descricao) {
        let indice = this.#vetProdutos.findIndex(produto =>
            produto.descricao.toUpperCase() == descricao.toUpperCase()
        );
        if (indice == -1) {
            return "PRODUTO_NAO_ENCONTRADO";
        }
        this.#vetProdutos.splice(indice, 1);
        this.salvarDados();
        return "SUCESSO";
    }

    alterarProduto(descricao, novosDados) {
        let produto = this.#buscarProduto(descricao);
        if (produto == undefined) {
            return "PRODUTO_NAO_ENCONTRADO";
        }
        if (novosDados.precoCompra != undefined && novosDados.precoCompra != "") {
            produto.precoCompra = Number(novosDados.precoCompra);
        }
        if (novosDados.precoVenda != undefined && novosDados.precoVenda != "") {
            produto.precoVenda = Number(novosDados.precoVenda);
        }
        if (novosDados.quantidadeEstoque != undefined && novosDados.quantidadeEstoque != "") {
            produto.quantidadeEstoque = Number(novosDados.quantidadeEstoque);
        }
        if (novosDados.cnpjFornecedor != undefined && novosDados.cnpjFornecedor != "") {
            let fornecedor = this.#buscarFornecedor(novosDados.cnpjFornecedor);
            if (fornecedor == undefined) {
                return "FORNECEDOR_NAO_ENCONTRADO";
            }
            produto.fornecedor = fornecedor;
        }

        this.salvarDados();
        return "SUCESSO";
    }

    consultarProduto(descricao) {
        let produto = this.#buscarProduto(descricao);
        if (produto == undefined) {
            return "PRODUTO_NAO_ENCONTRADO";
        }
        return this.#produtoDTO(produto);
    }

    alterarVendaMes(descricao, mes, quantidadeVendida) {
        let produto = this.#buscarProduto(descricao);
        if (produto == undefined) {
            return "PRODUTO_NAO_ENCONTRADO";
        }

        mes = Number(mes);
        quantidadeVendida = Number(quantidadeVendida);

        if (mes < 1 || mes > 12 || quantidadeVendida < 0) {
            return "DADOS_INVALIDOS";
        }

        produto.setQtdVendasMes(mes, quantidadeVendida);
        this.salvarDados();
        return "SUCESSO";
    }

    comprarProduto(descricao, quantidade, novosDados) {
        let produto = this.#buscarProduto(descricao);
        if (produto == undefined) {
            return "PRODUTO_NAO_ENCONTRADO";
        }

        quantidade = Number(quantidade);
        if (quantidade <= 0) {
            return "QUANTIDADE_INVALIDA";
        }

        let fornecedor = produto.fornecedor;
        if (novosDados.cnpjFornecedor != undefined && novosDados.cnpjFornecedor != "") {
            fornecedor = this.#buscarFornecedor(novosDados.cnpjFornecedor);
            if (fornecedor == undefined) {
                return "FORNECEDOR_NAO_ENCONTRADO";
            }
        }

        let precoCompra = produto.precoCompra;
        if (novosDados.precoCompra != undefined && novosDados.precoCompra != "") {
            precoCompra = Number(novosDados.precoCompra);
        }
        if (fornecedor == undefined) {
            return "FORNECEDOR_NAO_VINCULADO";
        }

        let totalCompra = quantidade * precoCompra;
        if (totalCompra > fornecedor.creditoDisp) {
            return "CREDITO_INSUFICIENTE";
        }
        if (novosDados.cnpjFornecedor != undefined && novosDados.cnpjFornecedor != "") {
            produto.fornecedor = fornecedor;
        }
        if (novosDados.precoCompra != undefined && novosDados.precoCompra != "") {
            produto.precoCompra = precoCompra;
        }
        if (novosDados.precoVenda != undefined && novosDados.precoVenda != "") {
            produto.precoVenda = Number(novosDados.precoVenda);
        }

        produto.quantidadeEstoque = produto.quantidadeEstoque + quantidade;

        this.salvarDados();
        return "SUCESSO";
    }

    venderProduto(descricao, quantidadeVendida) {
        let produto = this.#buscarProduto(descricao);
        if (produto == undefined) {
            return "PRODUTO_NAO_ENCONTRADO";
        }

        quantidadeVendida = Number(quantidadeVendida);
        if (quantidadeVendida <= 0) {
            return "QUANTIDADE_INVALIDA";
        }
        if (produto.quantidadeEstoque < quantidadeVendida) {
            return "ESTOQUE_INSUFICIENTE";
        }

        produto.quantidadeEstoque = produto.quantidadeEstoque - quantidadeVendida;

        let totalVenda = quantidadeVendida * produto.precoVenda;

        this.salvarDados();

        return {
            codigo: "SUCESSO",
            totalVenda: totalVenda
        };
    }

    consultarTotalVendasAno(descricao) {
        let produto = this.#buscarProduto(descricao);
        if (produto == undefined) {
            return "PRODUTO_NAO_ENCONTRADO";
        }

        let totalUnidades = 0;
        for (let mes = 1; mes <= 12; mes++) {
            totalUnidades += produto.getQtdVendasMes(mes);
        }
        return {
            descricao: produto.descricao,
            totalUnidades: totalUnidades,
            faturamento: totalUnidades * produto.precoVenda
        };
    }

    consultarMaisVendidoMes(descricao) {
        let produto = this.#buscarProduto(descricao);
        if (produto == undefined) {
            return "PRODUTO_NAO_ENCONTRADO";
        }
        let maiorQuantidade = -1;
        let mesMaisVendido = 1;
        for (let mes = 1; mes <= 12; mes++) {
            let quantidade = produto.getQtdVendasMes(mes);
            if (quantidade > maiorQuantidade) {
                maiorQuantidade = quantidade;
                mesMaisVendido = mes;
            }
        }
        return {
            descricao: produto.descricao,
            mes: mesMaisVendido,
            quantidadeVendida: maiorQuantidade
        };
    }

    consultarFaturamentoMes(mes) {
        mes = Number(mes);
        if (mes < 1 || mes > 12) {
            return "MES_INVALIDO";
        }

        let faturamento = 0;
        for (let produto of this.#vetProdutos) {
            faturamento +=
                produto.getQtdVendasMes(mes) * produto.precoVenda;
        }
        return {
            mes: mes,
            faturamento: faturamento
        };
    }

    listarProdutos() {
        let lista = [];
        for (let produto of this.#vetProdutos) {
            lista.push(this.#produtoDTO(produto));
        }
        return lista;
    }

    listarTabelaVendasAnual() {
        let tabela = [];
        for (let produto of this.#vetProdutos) {
            let dadosProduto = {
                descricao: produto.descricao,
                vendas: []
            };
            for (let mes = 1; mes <= 12; mes++) {
                dadosProduto.vendas.push(produto.getQtdVendasMes(mes));
            }
            tabela.push(dadosProduto);
        }
        return tabela;
    }

    listarProdutosFornecedor(cnpj) {
        let fornecedor = this.#buscarFornecedor(cnpj);
        if (fornecedor == undefined) {
            return "FORNECEDOR_NAO_ENCONTRADO";
        }

        let lista = [];
        for (let produto of this.#vetProdutos) {
            if (produto.fornecedor != undefined && produto.fornecedor.cnpj == cnpj) {
                lista.push(this.#produtoDTO(produto));
            }
        }
        return lista;
    }

    salvarDados() {
        let dadosFornecedores = [];
        let dadosProdutos = [];

        for (let fornecedor of this.#vetFornecedores) {
            dadosFornecedores.push(fornecedor.stringify());
        }
        for (let produto of this.#vetProdutos) {
            dadosProdutos.push(produto.stringify());
        }
        localStorage.setItem(
            "armazemFornecedores",
            JSON.stringify(dadosFornecedores)
        );
        localStorage.setItem(
            "armazemProdutos",
            JSON.stringify(dadosProdutos)
        );
        return "SUCESSO";
    }

    carregarDados() {
        this.#vetFornecedores = [];
        this.#vetProdutos = [];

        let dadosFornecedores = localStorage.getItem("armazemFornecedores");
        let dadosProdutos = localStorage.getItem("armazemProdutos");

        if (dadosFornecedores != null) {
            dadosFornecedores = JSON.parse(dadosFornecedores);
            for (let dados of dadosFornecedores) {
                let fornecedorDados = JSON.parse(dados);
                let fornecedor = new Fornecedor(
                    fornecedorDados.razaoSocial,
                    fornecedorDados.cnpj,
                    fornecedorDados.telefone,
                    fornecedorDados.endereco,
                    fornecedorDados.creditoDisp
                );
                this.#vetFornecedores.push(fornecedor);
            }
        }

        if (dadosProdutos != null) {
            dadosProdutos = JSON.parse(dadosProdutos);
            for (let dados of dadosProdutos) {
                let produtoDados = JSON.parse(dados);
                let produto = new Produto(
                    produtoDados.descricao,
                    produtoDados.precoCompra,
                    produtoDados.precoVenda,
                    produtoDados.quantidadeEstoque
                );
                if (produtoDados.vetVendas != undefined) {
                    for (let mes = 1; mes <= 12; mes++) {
                        produto.setQtdVendasMes(
                            mes, produtoDados.vetVendas[mes - 1]
                        );
                    }
                }

                if (produtoDados.fornecedor != undefined && produtoDados.fornecedor != null) {
                    let fornecedor = this.#buscarFornecedor(
                        produtoDados.fornecedor
                    );
                    if (fornecedor != undefined) {
                        produto.fornecedor = fornecedor;
                    }
                }
                this.#vetProdutos.push(produto);
            }
        }
        return "SUCESSO";
    }
}