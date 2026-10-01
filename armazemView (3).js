import { ArmazemController } from "./armazemController.js";

const controller = new ArmazemController();
controller.carregarDados();

const rbProduto = document.getElementById("rbProduto");
const rbFornecedor = document.getElementById("rbFornecedor");
const divProduto = document.getElementById("cadastroProduto");
const divFornecedor = document.getElementById("cadastroFornecedor");
const selectProduto = document.getElementById("selectOpcaoProduto");
const selectFornecedor = document.getElementById("selectOpcaoFornecedor");

// Campos Produto
const inProduto = document.getElementById("inProduto");
const inPrecoCompra = document.getElementById("inPrecoCompra");
const inPrecoVenda = document.getElementById("inPrecoVenda");
const inQtd = document.getElementById("inQtd");
const inMes = document.getElementById("inMes");
const inFornecedor = document.getElementById("inFornecedor");

// Campos Fornecedor
const inRazaoSoc = document.getElementById("inRazaoSoc");
const inCnpj = document.getElementById("inCnpj");
const inTelefone = document.getElementById("inTelefone");
const inEndereco = document.getElementById("inEndereco");
const inCreditoDisp = document.getElementById("inCreditoDisp");

const btOk = document.getElementById("btOk");
const outResultado = document.getElementById("outResultado");
const sectionResult = document.querySelector(".sectionResultado");


// TROCAR ENTRE PRODUTO E FORNECEDOR
rbProduto.addEventListener("change", () => {
    divProduto.style.display = "block";
    divFornecedor.style.display = "none";

    desabilitarCamposFornecedor();
    limparTela();
});

rbFornecedor.addEventListener("change", () => {
    divProduto.style.display = "none";
    divFornecedor.style.display = "block";

    desabilitarCamposProduto();
    limparTela();
});


// OPÇÕES DE PRODUTO
selectProduto.addEventListener("change", () => {

    desabilitarCamposProduto();
    limparTela();

    const opcao = selectProduto.value;

    switch (opcao) {
        case "Cadastrar":
            habilitar(inProduto, "Digite o nome do produto");
            habilitar(inPrecoCompra, "Preço de Compra");
            habilitar(inPrecoVenda, "Preço de Venda");
            habilitar(inQtd, "Quantidade em estoque");
            habilitar(inFornecedor, "CNPJ do Fornecedor (opcional)");
            break;

        case "Excluir":
        case "Consultar":
        case "ConsultarQtd":
        case "ConsultarMaisVendido":
            habilitar(inProduto, "Digite o nome do produto");
            break;

        case "Alterar":
            habilitar(inProduto, "Digite o nome do produto");
            habilitar(inPrecoCompra, "Novo Preço de Compra");
            habilitar(inPrecoVenda, "Novo Preço de Venda");
            habilitar(inQtd, "Nova Quantidade");
            habilitar(inFornecedor, "CNPJ do Fornecedor");
            break;

        case "AlterarVenda":
            habilitar(inProduto, "Digite o nome do produto");
            habilitar(inMes, "Mês [1-12]");
            habilitar(inQtd, "Quantidade vendida");
            break;

        case "Comprar":
            habilitar(inProduto, "Digite o nome do produto");
            habilitar(inQtd, "Quantidade comprada");
            habilitar(inPrecoCompra, "Novo Preço de Compra (opcional)");
            habilitar(inPrecoVenda, "Novo Preço de Venda (opcional)");
            habilitar(inFornecedor, "CNPJ do Fornecedor (opcional)");
            break;

        case "Vender":
            habilitar(inProduto, "Digite o nome do produto");
            habilitar(inQtd, "Quantidade vendida");
            break;

        case "Faturamento":
            habilitar(inMes, "Mês [1-12]");
            break;

        case "ListarProdFornecedor":
            habilitar(inFornecedor, "CNPJ do Fornecedor");
            break;

        case "ListarProdutos":
        case "ListarVendas":
            break;
    }
    btOk.disabled = false;
});


// OPÇÕES DE FORNECEDOR
selectFornecedor.addEventListener("change", () => {

    desabilitarCamposFornecedor();
    limparTela();

    const opcao = selectFornecedor.value;

    switch (opcao) {
        case "Cadastrar":
            habilitar(inRazaoSoc, "Razão Social");
            habilitar(inCnpj, "CNPJ");
            habilitar(inTelefone, "Telefone");
            habilitar(inEndereco, "Endereço");
            habilitar(inCreditoDisp, "Crédito Disponibilizado");
            break;

        case "Excluir":
        case "Consultar":
            habilitar(inCnpj, "CNPJ");
            break;

        case "Alterar":
            habilitar(inCnpj, "CNPJ");
            habilitar(inRazaoSoc, "Nova Razão Social");
            habilitar(inTelefone, "Novo Telefone");
            habilitar(inEndereco, "Novo Endereço");
            habilitar(inCreditoDisp, "Novo Crédito");
            break;

        case "FiltrarLimCred":
            habilitar(inCreditoDisp, "Crédito mínimo");
            break;

        case "Listar":
            break;
    }
    btOk.disabled = false;
});


// BOTÃO OK
btOk.addEventListener("click", () => {

    limparTela();

    if (rbProduto.checked) {
        executarOpcaoProduto();
    }

    if (rbFornecedor.checked) {
        executarOpcaoFornecedor();
    }
});


// PRODUTOS
function executarOpcaoProduto() {

    const opcao = selectProduto.value;
    const descricao = inProduto.value.trim();
    const precoCompra = inPrecoCompra.value;
    const precoVenda = inPrecoVenda.value;
    const qtd = inQtd.value;
    const mes = inMes.value;
    const cnpjFornecedor = inFornecedor.value.trim();

    switch (opcao) {
        case "Cadastrar": {
            if (descricao == "") {
                exibirMensagem("O campo Produto é obrigatório!", "red");
                break;
            }

            const resultado = controller.cadastrarProduto( descricao, precoCompra, precoVenda, qtd, cnpjFornecedor );

            const mensagens = {
                "SUCESSO": {
                    texto: `Produto "${descricao}" cadastrado com sucesso!`,
                    cor: "blue"
                },
                "PRODUTO_JA_CADASTRADO": {
                    texto: `Erro! O produto "${descricao}" já está cadastrado!`,
                    cor: "red"
                },
                "FORNECEDOR_NAO_ENCONTRADO": {
                    texto: `Erro! Fornecedor com CNPJ "${cnpjFornecedor}" não encontrado!`,
                    cor: "red"
                }
            };

            exibirMensagem(
                mensagens[resultado].texto,
                mensagens[resultado].cor
            );
            break;
        }


        case "Excluir": {
            if (descricao == "") {
                exibirMensagem("O campo Produto é obrigatório!", "red");
                break;
            }

            const resultado = controller.excluirProduto(descricao);
            const mensagens = {
                "SUCESSO": {
                    texto: `Produto "${descricao}" excluído com sucesso!`,
                    cor: "blue"
                },
                "PRODUTO_NAO_ENCONTRADO": {
                    texto: `Produto "${descricao}" não encontrado!`,
                    cor: "red"
                }
            };
            exibirMensagem(
                mensagens[resultado].texto,
                mensagens[resultado].cor
            );
            break;
        }


        case "Alterar": {

            if (descricao == "") {
                exibirMensagem("O campo Produto é obrigatório!", "red");
                break;
            }

            let novosDados = {};
            let alterou = false;

            if (inPrecoCompra.value != "") {
                novosDados.precoCompra = precoCompra;
                alterou = true;
            }
            if (inPrecoVenda.value != "") {
                novosDados.precoVenda = precoVenda;
                alterou = true;
            }
            if (inQtd.value != "") {
                novosDados.quantidadeEstoque = qtd;
                alterou = true;
            }
            if (cnpjFornecedor != "") {
                novosDados.cnpjFornecedor = cnpjFornecedor;
                alterou = true;
            }
            if (!alterou) {
                exibirMensagem(
                    "Informe pelo menos um dado para alterar!",
                    "red"
                );
                break;
            }

            const resultado = controller.alterarProduto( descricao, novosDados );

            const mensagens = {
                "SUCESSO": {
                    texto: "Produto alterado com sucesso!",
                    cor: "blue"
                },

                "PRODUTO_NAO_ENCONTRADO": {
                    texto: `Produto "${descricao}" não encontrado!`,
                    cor: "red"
                },

                "FORNECEDOR_NAO_ENCONTRADO": {
                    texto: `Fornecedor com CNPJ "${cnpjFornecedor}" não encontrado!`,
                    cor: "red"
                }
            };

            exibirMensagem(
                mensagens[resultado].texto,
                mensagens[resultado].cor
            );
            break;
        }


        case "Consultar": {

            if (descricao == "") {
                exibirMensagem("O campo Produto é obrigatório!", "red");
                break;
            }

            const dados = controller.consultarProduto(descricao);

            if (typeof dados == "string") {
                exibirMensagem(
                    `Produto "${descricao}" não encontrado!`,
                    "red"
                );

            } else {

                let fornecedor = "Não vinculado";
                if (dados.cnpjFornecedor != undefined) {
                    fornecedor =
                        dados.razaoSocialFornecedor +
                        " - " +
                        dados.cnpjFornecedor;
                }

                exibirMensagem(
                    `Descrição: ${dados.descricao}\n` +
                    `Preço de Compra: R$ ${dados.precoCompra.toFixed(2)}\n` +
                    `Preço de Venda: R$ ${dados.precoVenda.toFixed(2)}\n` +
                    `Quantidade em Estoque: ${dados.quantidadeEstoque}\n` +
                    `Fornecedor: ${fornecedor}`,
                    "blue"
                );
            }
            break;
        }


        case "AlterarVenda": {
            if (descricao == "" || mes == "" || qtd == "") {
                exibirMensagem(
                    "Produto, mês e quantidade são obrigatórios!",
                    "red"
                );
                break;
            }

            const resultado = controller.alterarVendaMes(descricao, mes, qtd );
            const mensagens = {

                "SUCESSO": {
                    texto: "Venda do mês alterada com sucesso!",
                    cor: "blue"
                },
                "PRODUTO_NAO_ENCONTRADO": {
                    texto: `Produto "${descricao}" não encontrado!`,
                    cor: "red"
                },
                "DADOS_INVALIDOS": {
                    texto: "Mês ou quantidade inválidos!",
                    cor: "red"
                }
            };

            exibirMensagem(
                mensagens[resultado].texto,
                mensagens[resultado].cor
            );
            break;
        }


        case "Comprar": {
            if (descricao == "" || qtd == "") {
                exibirMensagem(
                    "Produto e quantidade são obrigatórios!",
                    "red"
                );
                break;
            }

            let novosDados = {};

            if (precoCompra != "") {
                novosDados.precoCompra = precoCompra;
            }
            if (precoVenda != "") {
                novosDados.precoVenda = precoVenda;
            }
            if (cnpjFornecedor != "") {
                novosDados.cnpjFornecedor = cnpjFornecedor;
            }

            const resultado = controller.comprarProduto(descricao, qtd, novosDados );
            const mensagens = {
                "SUCESSO": {
                    texto: `Compra do produto "${descricao}" registrada com sucesso!`,
                    cor: "blue"
                },
                "PRODUTO_NAO_ENCONTRADO": {
                    texto: `Produto "${descricao}" não encontrado!`,
                    cor: "red"
                },
                "FORNECEDOR_NAO_ENCONTRADO": {
                    texto: `Fornecedor "${cnpjFornecedor}" não encontrado!`,
                    cor: "red"
                },
                "FORNECEDOR_NAO_VINCULADO": {
                    texto: "O produto não possui fornecedor vinculado!",
                    cor: "red"
                },
                "CREDITO_INSUFICIENTE": {
                    texto: "Crédito do fornecedor insuficiente!",
                    cor: "red"
                },
                "QUANTIDADE_INVALIDA": {
                    texto: "Quantidade inválida!",
                    cor: "red"
                }
            };

            exibirMensagem(
                mensagens[resultado].texto,
                mensagens[resultado].cor
            );
            break;
        }


        case "Vender": {
            if (descricao == "" || qtd == "") {
                exibirMensagem(
                    "Produto e quantidade são obrigatórios!",
                    "red"
                );
                break;
            }

            const resultado = controller.venderProduto( descricao, qtd );

            if (typeof resultado == "object" &&
                resultado.codigo == "SUCESSO") {
                exibirMensagem(
                    `Venda realizada com sucesso!\n` +
                    `Total a pagar: R$ ${resultado.totalVenda.toFixed(2)}`,
                    "blue"
                );

            } else {

                const mensagens = {
                    "PRODUTO_NAO_ENCONTRADO":
                        `Produto "${descricao}" não encontrado!`,
                    "QUANTIDADE_INVALIDA":
                        "Quantidade inválida!",
                    "ESTOQUE_INSUFICIENTE":
                        "Quantidade em estoque insuficiente!"
                };

                exibirMensagem( mensagens[resultado], "red" );
            }
            break;
        }

        case "ConsultarQtd": {
            if (descricao == "") {
                exibirMensagem("O campo Produto é obrigatório!", "red");
                break;
            }

            const dados = controller.consultarTotalVendasAno(descricao);

            if (typeof dados == "string") {
                exibirMensagem(
                    `Produto "${descricao}" não encontrado!`,
                    "red"
                );
            } else {
                exibirMensagem(
                    `Produto: ${dados.descricao}\n` +
                    `Total vendido no ano: ${dados.totalUnidades} unidades\n` +
                    `Faturamento: R$ ${dados.faturamento.toFixed(2)}`,
                    "blue"
                );
            }
            break;
        }

        case "ConsultarMaisVendido": {
            if (descricao == "") {
                exibirMensagem("O campo Produto é obrigatório!", "red");
                break;
            }

            const dados = controller.consultarMaisVendidoMes(descricao);
            if (typeof dados == "string") {
                exibirMensagem(
                    `Produto "${descricao}" não encontrado!`,
                    "red"
                );

            } else {

                exibirMensagem(
                    `Produto: ${dados.descricao}\n` +
                    `Mês mais vendido: ${dados.mes}\n` +
                    `Quantidade vendida: ${dados.quantidadeVendida}`,
                    "blue"
                );
            }

            break;
        }

        case "Faturamento": {
            if (mes == "") {
                exibirMensagem("Informe o mês!", "red");
                break;
            }

            const dados = controller.consultarFaturamentoMes(mes);

            if (typeof dados == "string") {
                exibirMensagem("Mês inválido!", "red");
            } else {

                exibirMensagem(
                    `Faturamento do mês ${dados.mes}: ` +
                    `R$ ${dados.faturamento.toFixed(2)}`,
                    "blue"
                );
            }
            break;
        }

        case "ListarProdutos": {
            const lista = controller.listarProdutos();

            if (lista.length == 0) {
                exibirMensagem( "Nenhum produto cadastrado!", "red" );
            } else {
                sectionResult.appendChild( criarTabelaProdutos(lista) );
            }
            break;
        }


        case "ListarVendas": {
            const lista = controller.listarTabelaVendasAnual();

            if (lista.length == 0) {
                exibirMensagem( "Nenhum produto cadastrado!", "red" );
            } else {
                sectionResult.appendChild( criarTabelaProdutos(lista) );
            }
            break;
        }

        case "ListarVendas": {
            const lista = controller.listarTabelaVendasAnual();

            if (lista.length == 0) {
                exibirMensagem( "Nenhum produto cadastrado!", "red" );
            } else {
                sectionResult.appendChild(
                    criarTabelaVendas(lista)
                );
            }
            break;
        }


        case "ListarProdFornecedor": {
            if (cnpjFornecedor == "") {
                exibirMensagem( "Informe o CNPJ do fornecedor!", "red" );
                break;
            }

            const lista = controller.listarProdutosFornecedor( cnpjFornecedor );

            if (typeof lista == "string") {
                exibirMensagem( "Fornecedor não encontrado!", "red" );
            } else if (lista.length == 0) {
                exibirMensagem( "Nenhum produto vinculado a este fornecedor!", "red" );
            } else {
                sectionResult.appendChild(criarTabelaProdutos(lista) );
            }
            break;
        }
    }
}

// FORNECEDORES
function executarOpcaoFornecedor() {

    const opcao = selectFornecedor.value;
    const razaoSocial = inRazaoSoc.value.trim();
    const cnpj = inCnpj.value.trim();
    const telefone = inTelefone.value.trim();
    const endereco = inEndereco.value.trim();
    const credito = inCreditoDisp.value;

    switch (opcao) {
        case "Cadastrar": {
            if (razaoSocial == "" || cnpj == "") {
                exibirMensagem( "Razão Social e CNPJ são obrigatórios!", "red" );
                break;
            }

            const resultado = controller.cadastrarFornecedor( razaoSocial, cnpj, telefone, endereco, credito );

            const mensagens = {
                "SUCESSO": {
                    texto: `Fornecedor "${razaoSocial}" cadastrado com sucesso!`,
                    cor: "blue"
                },
                "FORNECEDOR_JA_CADASTRADO": {
                    texto: `Já existe um fornecedor com o CNPJ "${cnpj}"!`,
                    cor: "red"
                }
            };
            exibirMensagem(
                mensagens[resultado].texto,
                mensagens[resultado].cor
            );
            break;
        }

        case "Excluir": {
            if (cnpj == "") {
                exibirMensagem( "O campo CNPJ é obrigatório!", "red" );
                break;
            }

            const resultado = controller.excluirFornecedor(cnpj);

            const mensagens = {
                "SUCESSO": {
                    texto: "Fornecedor excluído com sucesso!",
                    cor: "blue"
                },
                "FORNECEDOR_NAO_ENCONTRADO": {
                    texto: `Fornecedor "${cnpj}" não encontrado!`,
                    cor: "red"
                },
                "FORNECEDOR_VINCULADO_A_PRODUTO": {
                    texto: "Não é possível excluir: fornecedor vinculado a um produto!",
                    cor: "red"
                }
            };

            exibirMensagem( mensagens[resultado].texto, mensagens[resultado].cor );
            break;
        }


        case "Alterar": {

            if (cnpj == "") {
                exibirMensagem( "O CNPJ é obrigatório!", "red" );
                break;
            }

            let novosDados = {};
            let alterou = false;

            if (razaoSocial != "") {
                novosDados.razaoSocial = razaoSocial;
                alterou = true;
            }
            if (telefone != "") {
                novosDados.telefone = telefone;
                alterou = true;
            }
            if (endereco != "") {
                novosDados.endereco = endereco;
                alterou = true;
            }
            if (credito != "") {
                novosDados.creditoDisp = credito;
                alterou = true;
            }
            if (!alterou) {
                exibirMensagem( "Informe pelo menos um dado para alterar!", "red" );
                break;
            }

            const resultado = controller.alterarFornecedor( cnpj, novosDados );

            const mensagens = {
                "SUCESSO": {
                    texto: "Fornecedor alterado com sucesso!",
                    cor: "blue"
                },
                "FORNECEDOR_NAO_ENCONTRADO": {
                    texto: `Fornecedor "${cnpj}" não encontrado!`,
                    cor: "red"
                }
            };

            exibirMensagem( mensagens[resultado].texto, mensagens[resultado].cor);
            break;
        }


        case "Consultar": {
            if (cnpj == "") {
                exibirMensagem( "O campo CNPJ é obrigatório!", "red" );
                break;
            }

            const dados = controller.consultarFornecedor(cnpj);

            if (typeof dados == "string") {
                exibirMensagem( `Fornecedor "${cnpj}" não encontrado!`,"red" );

            } else {
                exibirMensagem(
                    `Razão Social: ${dados.razaoSocial}\n` +
                    `CNPJ: ${dados.cnpj}\n` +
                    `Telefone: ${dados.telefone}\n` +
                    `Endereço: ${dados.endereco}\n` +
                    `Crédito Disponibilizado: R$ ${dados.creditoDisp.toFixed(2)}`,
                    "blue"
                );
            }
            break;
        }


        case "Listar": {
            const lista = controller.listarFornecedores();

            if (lista.length == 0) {
                exibirMensagem( "Nenhum fornecedor cadastrado!","red" );
            } else {
                sectionResult.appendChild( criarTabelaFornecedores(lista) );
            }
            break;
        }


        case "FiltrarLimCred": {

            if (credito == "") {
                exibirMensagem( "Informe o crédito mínimo!", "red" );
                break;
            }

            const lista = controller.filtrarFornecedoresPorCredito( credito);

            if (lista.length == 0) {
                exibirMensagem( "Nenhum fornecedor encontrado!","red" );
            } else {
                sectionResult.appendChild( criarTabelaFornecedores(lista));
            }
            break;
        }
    }
}

// FUNÇÕES AUXILIARES
function habilitar(campo, placeholder) {

    campo.disabled = false;
    campo.placeholder = placeholder;
}

function desabilitarCamposProduto() {

    [
        inProduto,
        inPrecoCompra,
        inPrecoVenda,
        inQtd,
        inMes,
        inFornecedor
    ].forEach(campo => {

        campo.disabled = true;
        campo.value = "";
        campo.placeholder = "";

    });

    btOk.disabled = true;
}

function desabilitarCamposFornecedor() {

    [
        inRazaoSoc,
        inCnpj,
        inTelefone,
        inEndereco,
        inCreditoDisp
    ].forEach(campo => {

        campo.disabled = true;
        campo.value = "";
        campo.placeholder = "";

    });

    btOk.disabled = true;
}

function limparTela() {

    outResultado.textContent = "";
    sectionResult.innerHTML = "";
}

function exibirMensagem(texto, cor) {

    outResultado.style.color = cor;
    outResultado.textContent = texto;
}

// TABELA DE PRODUTOS
function criarTabelaProdutos(lista) {

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    const trHead = document.createElement("tr");

    [
        "Descrição",
        "Preço Compra",
        "Preço Venda",
        "Estoque",
        "Fornecedor"
    ].forEach(texto => {

        const th = document.createElement("th");

        th.textContent = texto;
        trHead.appendChild(th);
    });

    thead.appendChild(trHead);
    table.appendChild(thead);


    lista.forEach(produto => {

        const tr = document.createElement("tr");
        let fornecedor = "Não vinculado";

        if (produto.cnpjFornecedor != undefined) {
            fornecedor = produto.razaoSocialFornecedor + " - " + produto.cnpjFornecedor;
        }

        [
            produto.descricao,
            `R$ ${produto.precoCompra.toFixed(2)}`,
            `R$ ${produto.precoVenda.toFixed(2)}`,
            produto.quantidadeEstoque,
            fornecedor
        ].forEach(valor => {

            const td = document.createElement("td");

            td.textContent = valor;
            tr.appendChild(td);
        });

        tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    return table;
}

// TABELA DE VENDAS
function criarTabelaVendas(lista) {

    const meses = [
        "Jan", "Fev", "Mar", "Abr",
        "Mai", "Jun", "Jul", "Ago",
        "Set", "Out", "Nov", "Dez"
    ];

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    const trHead = document.createElement("tr");

    [
        "Produto",
        ...meses
    ].forEach(texto => {

        const th = document.createElement("th");

        th.textContent = texto;
        trHead.appendChild(th);
    });

    thead.appendChild(trHead);
    table.appendChild(thead);


    lista.forEach(produto => {

        const tr = document.createElement("tr");

        [
            produto.descricao,
            ...produto.vendas
        ].forEach(valor => {

            const td = document.createElement("td");

            td.textContent = valor;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    return table;
}

// TABELA DE FORNECEDORES
function criarTabelaFornecedores(lista) {

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    const trHead = document.createElement("tr");

    [
        "Razão Social",
        "CNPJ",
        "Telefone",
        "Endereço",
        "Crédito"
    ].forEach(texto => {

        const th = document.createElement("th");

        th.textContent = texto;
        trHead.appendChild(th);
    });

    thead.appendChild(trHead);
    table.appendChild(thead);


    lista.forEach(fornecedor => {

        const tr = document.createElement("tr");

        [
            fornecedor.razaoSocial,
            fornecedor.cnpj,
            fornecedor.telefone,
            fornecedor.endereco,
            `R$ ${fornecedor.creditoDisp.toFixed(2)}`
        ].forEach(valor => {

            const td = document.createElement("td");

            td.textContent = valor;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    return table;
}