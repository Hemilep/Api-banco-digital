const express = require('express');
const validarSenha = require('./intermediario')

const { listarContas, criarConta, atualizarUsuario, deletarConta, saldo, extrato} = require('./controladores/contas');
const { depositar, sacar, transferir } = require('./controladores/transacoes');

const rotas = express();

rotas.get('/contas/extrato', extrato)
rotas.get('/contas/saldo', saldo);
rotas.post('/transacoes/transferir', transferir);
rotas.post('/transacoes/sacar', sacar)
rotas.post('/transacoes/depositar', depositar);
rotas.delete('/contas/:numeroConta', deletarConta);
rotas.put('/contas/:numeroConta/usuario', atualizarUsuario);
rotas.post('/contas', criarConta);

rotas.use(validarSenha);
rotas.get('/contas', listarContas);



module.exports = rotas;