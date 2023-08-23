let { contas, depositos, saques, transferencias } = require('../bancodedados');
const { format } = require('date-fns');

const depositar = (req, res) => {
    const { numero_conta, valor } = req.body;

    if (valor <= 0) {
        return res.status(400).json({ mensagem: 'Digite um valor maior que zero!' });
    }

    if (!numero_conta || !valor) {
        return res.status(400).json({ mensagem: 'O número da conta e o valor são obrigatórios!' });
    }

    const contaEncontrada = contas.find((conta) => {
        return conta.numero === numero_conta;
    })

    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: 'Conta não encontrada. Digite o número novamente.' });
    }
    
    let valorTotal = contaEncontrada.saldo + valor;
    let data = new Date ();

    contaEncontrada.saldo = valorTotal;

    const deposito = {
        data: format(data, "yyyy/MM/dd HH:mm:ss"),
        numero_conta,
        valor
    }

    depositos.push(deposito);
    return res.status(204).json();

}

const sacar = (req, res) => {
    const { numero_conta, valor, senha } = req.body;

    if (valor <= 0) {
        return res.status(400).json({ mensagem: 'Digite um valor maior que zero!' });
    }

    if (!numero_conta || !valor || !senha) {
        return res.status(400).json({ mensagem: 'O número da conta, o valor e a senha são obrigatórios!' });
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

    if (contaEncontrada.saldo < valor) {
        return res.status(400).json({ mensagem: 'Saldo insuficiente.' });
    }

    let valorTotal = contaEncontrada.saldo - valor;
    let data = new Date ();

    contaEncontrada.saldo = valorTotal;

    const saque = {
        data: format(data, "yyyy/MM/dd HH:mm:ss"),
        numero_conta,
        valor
    }

    saques.push(saque);
    return res.status(204).json();

}

const transferir = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

    // A verificação do valor ficou acima da verificação do corpo da requisição para garantir que o insomnia leria
    // o zero como número e não como espaço vazio. 

    if (valor <= 0) {
        return res.status(400).json({ mensagem: 'Digite um valor maior que zero!' });
    }

    if (!numero_conta_origem || !numero_conta_destino || !valor || !senha) {
        return res.status(400).json({ mensagem: 'O número das contas, o valor e a senha são obrigatórios!' });
    }

    if(numero_conta_origem === numero_conta_destino){
        return res.status(400).json({ mensagem: 'A conta de origem deve ser diferente da conta de destino'})
    }

    const contaOrigemEncontrada = contas.find((conta) => {
        return conta.numero === numero_conta_origem;
    })

    const contaDestinoEncontrada = contas.find((conta) => {
        return conta.numero === numero_conta_destino;
    })

    if (!contaOrigemEncontrada) {
        return res.status(404).json({ mensagem: 'Conta de origem não encontrada. Digite o número novamente.' });
    }

    if (!contaDestinoEncontrada) {
        return res.status(404).json({ mensagem: 'Conta de destino não encontrada. Digite o número novamente.' });
    }

    if (contaOrigemEncontrada.usuario.senha !== senha) {
        return res.status(401).json({ mensagem: 'A senha está incorreta.' });
    }
    
    if (contaOrigemEncontrada.saldo < valor) {
        return res.status(400).json({ mensagem: 'Saldo insuficiente.' });
    }

    let valorTotalOrigem = contaOrigemEncontrada.saldo - valor;
    let valorTotalDestino = contaDestinoEncontrada.saldo + valor;
    let data = new Date ();

    contaOrigemEncontrada.saldo = valorTotalOrigem;
    contaDestinoEncontrada.saldo = valorTotalDestino;

    const transferencia = {
        data: format(data, "yyyy/MM/dd HH:mm:ss"),
        numero_conta_origem,
        numero_conta_destino,
        valor
    }

    transferencias.push(transferencia);
    return res.status(204).json();

}


module.exports = {
    depositar,
    sacar,
    transferir
}