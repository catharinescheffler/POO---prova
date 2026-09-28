export class Produto {
    #descricao;
    #preco;
    #quantidadeEstoque;
    #vetVendas;

    constructor(descricao, preco = 0, quantidadeEstoque = 0) {
        this.#descricao = descricao.toUpperCase();
        this.#preco = preco;
        this.#quantidadeEstoque = quantidadeEstoque;
        this.#vetVendas = [];

        for (let i = 0; i < 12; i++) {
            this.#vetVendas.push(0);
        }
    }

    get descricao() {
        return this.#descricao;
    }

    set descricao(novaDescricao) {
        if (novaDescricao != "") {
            this.#descricao = novaDescricao.toUpperCase();
        }
    }

    get preco() {
        return this.#preco;
    }

    set preco(novoPreco) {
        if (novoPreco >= 0) {
            this.#preco = novoPreco;
        }
    }

    get quantidadeEstoque() {
        return this.#quantidadeEstoque;
    }

    set quantidadeEstoque(novaQuantidade) {
        if (novaQuantidade >= 0) {
            this.#quantidadeEstoque = novaQuantidade;
        }
    }

    getQtdVendasMes(mes) {
        if (mes >= 1 && mes <= 12) {
            return this.#vetVendas[mes - 1];
        }
        return undefined;
    }

    setQtdVendasMes(mes, quantidade) {
        if (mes >= 1 && mes <= 12 && quantidade >= 0) {
            this.#vetVendas[mes - 1] = quantidade;
        }
    }

    toString() {
        return "Descrição: " + this.#descricao + "\nPreço: " + this.#preco +
            "\nQuantidade em Estoque: " + this.#quantidadeEstoque +
            "\nVendas no Ano: " + this.#vetVendas;
    }
}