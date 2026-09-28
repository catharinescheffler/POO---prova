export class Fornecedor {

    #razaoSocial;
    #cnpj;
    #telefone;
    #endereco;
    #creditoDisp;

    constructor(razaoSocial, cnpj, telefone, endereco, creditoDisp) {
        this.#razaoSocial = razaoSocial;
        this.#cnpj = cnpj;
        this.#telefone = telefone;
        this.#endereco = endereco;
        this.#creditoDisp = creditoDisp;
    }

    get razaoSocial() {
        return this.#razaoSocial;
    }

    set razaoSocial(novaRazaoSocial) {
        if(novaRazaoSocial != undefined && novaRazaoSocial != "")
            this.#razaoSocial = novaRazaoSocial.toUpperCase();
    }

    get cnpj() {
        return this.#cnpj;
    }

    set cnpj(novoCnpj) {
        if(novoCnpj != undefined && novoCnpj.length == 18)
            this.#cnpj = novoCnpj;
    }

    get telefone() {
        return this.#telefone;
    }

    set telefone(novoTelefone) {
        if(novoTelefone != undefined && novoTelefone.length == 14)
            this.#telefone = novoTelefone;
    }

    get endereco() {
        return this.#endereco;
    }

    set endereco(novoEndereco) {
        if(novoEndereco != undefined && novoEndereco != "")
            this.#endereco = novoEndereco.toUpperCase();
    }

    get creditoDisp() {
        return this.#creditoDisp;
    }

    set creditoDisp(novoCredito) {
        if(novoCredito != undefined && novoCredito > 0)
            this.#creditoDisp = novoCredito;
    }

    toString() {
        return `Razão Social: ${this.#razaoSocial}\n`+
               `CNPJ: ${this.#cnpj}\n`+
               `Telefone: ${this.#telefone}\n`+
               `Endereço: ${this.#endereco}\n`+
               `Crédito Disponibilizado: R$ ${this.#creditoDisp}`;
    }

    stringify() {
        return JSON.stringify({
            razaoSocial: this.#razaoSocial,
            cnpj: this.#cnpj,
            telefone: this.#telefone,
            endereco: this.#endereco,
            creditoDisp: this.#creditoDisp
        });
    }
}