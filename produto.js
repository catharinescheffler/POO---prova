export class Produto {
    #descricao;
    #precoCompra;
    #precoVenda;
    #quantidadeEstoque;
    #vetVendas;
    #fornecedor;

    constructor(descricao, precoCompra = 0, precoVenda = 0, quantidadeEstoque = 0) {
        this.#descricao = descricao.toUpperCase();
        this.#precoCompra = precoCompra;
        this.#precoVenda = precoVenda;
        this.#quantidadeEstoque = quantidadeEstoque;
        this.#vetVendas = [];
        this.#fornecedor = undefined;

        for (let i = 0; i < 12; i++) {
            this.#vetVendas.push(0);
        }
    }

    get descricao() {
        return this.#descricao;
    }

    set descricao(novaDescricao) {
        if (novaDescricao != undefined && novaDescricao != "") {
            this.#descricao = novaDescricao.toUpperCase();
        }
    }

    get precoCompra() {
        return this.#precoCompra;
    }

    set precoCompra(novoPrecoCompra) {
        if (novoPrecoCompra >= 0) {
            this.#precoCompra = novoPrecoCompra;
        }
    }

    get precoVenda() {
        return this.#precoVenda;
    }

    set precoVenda(novoPrecoVenda) {
        if (novoPrecoVenda >= 0) {
            this.#precoVenda = novoPrecoVenda;
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

    get fornecedor() {
        return this.#fornecedor;
    }

    set fornecedor(novoFornecedor) {
        this.#fornecedor = novoFornecedor;
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
        let texto = "Descrição: " + this.#descricao +
            "\nPreço de Compra: R$ " + this.#precoCompra +
            "\nPreço de Venda: R$ " + this.#precoVenda +
            "\nQuantidade em Estoque: " + this.#quantidadeEstoque +
            "\nVendas no Ano: " + this.#vetVendas;

        if (this.#fornecedor != undefined) {
            texto += "\nFornecedor: " + this.#fornecedor.razaoSocial +
                "\nCNPJ do Fornecedor: " + this.#fornecedor.cnpj;
        }

        return texto;
    }

    stringify() {
        let cnpjFornecedor = null;

        if (this.#fornecedor != undefined) {
            cnpjFornecedor = this.#fornecedor.cnpj;
        }

        return JSON.stringify({
            descricao: this.#descricao,
            precoCompra: this.#precoCompra,
            precoVenda: this.#precoVenda,
            quantidadeEstoque: this.#quantidadeEstoque,
            vetVendas: this.#vetVendas,
            fornecedor: cnpjFornecedor
        });
    }
}