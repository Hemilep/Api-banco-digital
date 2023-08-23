let { contas, saques, depositos, transferencias } = require('../bancodedados');
let idUsuarios = 1;

const listarContas = (req, res) => {
    return res.status(200).json(contas);
}

const criarConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios!' });
    }

    const verificarCpf = contas.find(conta => conta.usuario.cpf === cpf);

    const verificarEmail = contas.find(conta => conta.usuario.email === email);

    if (verificarCpf || verificarEmail) {
        return res.status(400).json({ mensagem: 'Já existe uma conta com o cpf ou e-mail informado!' });
    }

    const conta = {
        numero: (idUsuarios++).toString(),
        saldo: 0,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha
        }
    }
    contas.push(conta);
    return res.status(201).json();

}

const atualizarUsuario = (req, res) => {
    const { numeroConta } = req.params;
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios!' });
    }

    const contaEncontrada = contas.find((conta) => {
        return conta.numero === numeroConta;
    })

    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: 'Conta não encontrada. Digite o número da conta novamente.' });
    }

    if (contaEncontrada.usuario.cpf !== cpf) {

        const verificarCpf = contas.find(conta => conta.usuario.cpf === cpf);

        if (verificarCpf) {
            return res.status(400).json({ mensagem: 'Já existe uma conta com o cpf informado!' });
        }
    }

    if (contaEncontrada.usuario.email !== email) {

        const verificarEmail = contas.find(conta => conta.usuario.email === email);

        if (verificarEmail) {
            return res.status(400).json({ mensagem: 'Já existe uma conta com o e-mail informado!' });
        }
    }

    contaEncontrada.usuario.nome = nome;
    contaEncontrada.usuario.cpf = cpf;
    contaEncontrada.usuario.data_nascimento = data_nascimento;
    contaEncontrada.usuario.telefone = telefone;
    contaEncontrada.usuario.email = email;
    contaEncontrada.usuario.senha = senha;

    return res.status(204).send();

}

const deletarConta = (req, res) => {

    const { numeroConta } = req.params;

    const verificarNumeroConta = contas.find((conta) => {
        return conta.numero === numeroConta;
    })

    if (!verificarNumeroConta) {
        return res.status(404).json({ mensagem: 'Conta não encontrada. Digite o número da conta novamente.' });
    }

    if (verificarNumeroConta.saldo !== 0) {
        return res.status(401).json({ mensagem: 'A conta só pode ser removida se o saldo for zero!' });
    }

    const verificarIndiceConta = contas.findIndex((conta) => {
        return conta.numero === numeroConta;
    })

    contas.splice(verificarIndiceConta, 1)

    return res.status(204).send();
}

const saldo = (req, res) => {
    const { numero_conta, senha } = req.query;


    if (!numero_conta || !senha) {
        return res.status(400).json({ mensagem: 'O número da conta e a senha são obrigatórios!' });
    }

    const contaEncontrada = contas.find((conta) => {
        return conta.numero === numero_conta;
    })

    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: 'Conta não encontrada. Digite o número novamente.' });
    }

    if (contaEncontrada.usuario.senha !== senha) {
        return res.status(401).json({ mensagem: 'A senha está incorreta.' });
    }

    const saldo = {
        saldo: contaEncontrada.saldo
    }

    return res.status(200).json(saldo);

}

const extrato = (req, res) => {
    const { numero_conta, senha } = req.query;


    if (!numero_conta || !senha) {
        return res.status(400).json({ mensagem: 'O número da conta e a senha são obrigatórios!' });
    }

    const contaEncontrada = contas.find((conta) => {
        return conta.numero === numero_conta;
    })

    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: 'Conta não encontrada. Digite o número novamente.' });
    }

    if (contaEncontrada.usuario.senha !== senha) {
        return res.status(401).json({ mensagem: 'A senha está incorreta.' });
    }

    const depositoEncontrado = depositos.filter((deposito) => {
        return deposito.numero_conta === numero_conta;
    })

    const saqueEncontrado = saques.filter((saque) => {
        return saque.numero_conta === numero_conta;
    })

    const transferenciaEnviada = transferencias.filter((transferencia) => {
        return transferencia.numero_conta_origem === numero_conta;
    })

    const transferenciaRecebida = transferencias.filter((transferencia) => {
        return transferencia.numero_conta_destino === numero_conta;
    })

    const relatorioConta = {
        depositos: depositoEncontrado,
        saques: saqueEncontrado,
        transferenciasEnviadas: transferenciaEnviada,
        transferenciasRecebidas: transferenciaRecebida,
    }

    return res.status(200).json(relatorioConta);

}


module.exports = {
    listarContas,
    criarConta,
    atualizarUsuario,
    deletarConta,
    saldo,
    extrato
}