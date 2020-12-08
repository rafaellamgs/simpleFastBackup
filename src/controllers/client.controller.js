"use strict";

const Client = require("../models/client.model");

const scriptsController = require("../controllers/scripts.controller");

module.exports = {
	async findAll(req, res) {
		Client.findAll(function (err, client) {
			if (err) res.send(err);
			res.send(client);
		});
	},

	async create(req, res) {
		const new_employee = new Client(req.body);
		//handles null error
		if (
			req.body.constructor === Object &&
			Object.keys(req.body).length === 0
		) {
			res.status(400).send({
				error: true,
				message: "Por favor forneã todos os campos obrigatórios.",
			});
		} else {
			Client.create(new_employee, function (err, client) {
				if (err) res.send(err);
				res.json({
					error: false,
					message: "Cliente added successfully!",
					data: client,
				});
			});
		}
	},

	async findById(req, res) {
		Client.findById(req.params.codigo, function (err, client) {
			if (err) res.send(err);
			res.json(client);
		});
	},

	async update(req, res) {
		if (
			req.body.constructor === Object &&
			Object.keys(req.body).length === 0
		) {
			res.status(400).send({
				error: true,
				message: "Por favor forneã todos os campos obrigatórios.",
			});
		} else {
			Client.update(
				req.params.codigo,
				new Client(req.body),
				function (err, client) {
					if (err) res.send(err);
					res.json({
						error: false,
						message: "Cliente atualizado com sucesso",
					});
				}
			);
		}
	},

	async ativarBackup(req, res) {
		if (
			req.body.constructor === Object &&
			Object.keys(req.query).length === 0
		) {
			res.status(400).send({
				error: true,
				message: "Por favor forneça todos os campos obrigatórios.",
			});
		} else {
			const codigoCliente = req.params.codigo;
			const ativar = req.query.perm_bkp_autm;

			Client.findById(codigoCliente, function (err, client) {
				if (err) res.send(err);
				else if (client) {
					const clienteSelecionado = client;
					const clienteAtualizado = new Client({
						...clienteSelecionado,
						perm_bkp_autm: Number(ativar),
					});

					Client.update(
						req.params.codigo,
						new Client({
							...clienteSelecionado,
							perm_bkp_autm: Number(ativar),
						}),
						function (err, client) {
							if (err) res.send(err);
							scriptsController.backup_automatico();

							res.json({
								error: false,
								message: "Cliente atualizado com sucesso",
								client,
							});
						}
					);
				}
			});
		}
	},

	async ativarNotificacao(req, res) {
		if (
			req.body.constructor === Object &&
			Object.keys(req.query).length === 0
		) {
			res.status(400).send({
				error: true,
				message: "Por favor forneça todos os campos obrigatórios.",
			});
		} else {
			const codigoCliente = req.params.codigo;
			const notificar = req.query.perm_alerta;

			Client.findById(codigoCliente, function (err, client) {
				if (err) res.send(err);
				else if (client) {
					const clienteSelecionado = client;
					const clienteAtualizado = new Client({
						...clienteSelecionado,
						perm_alerta: Number(notificar),
					});

					Client.update(
						req.params.codigo,
						new Client({
							...clienteSelecionado,
							perm_alerta: Number(notificar),
						}),
						function (err, client) {
							if (err) res.send(err);
							res.json({
								error: false,
								message: "Cliente atualizado com sucesso",
								client,
							});
						}
					);
				}
			});
		}
	},

	async realizarBackup(req, res) {
		if (
			req.body.constructor === Object &&
			Object.keys(req.params).length === 0
		) {
			res.status(400).send({
				error: true,
				message: "Por favor forneça todos os campos obrigatórios.",
			});
		} else {
			const codigoCliente = req.params.codigo;

			Client.findById(codigoCliente, function (err, client) {
				if (err) res.send(err);
				else if (client) {
					scriptsController.realizacao_backup(codigoCliente);

					res.json({
						error: false,
						message: "Backup iniciado com sucesso",
					});
				}
			});
		}
	},

	async restaurarBackup(req, res) {
		if (
			req.body.constructor === Object &&
			Object.keys(req.params).length === 0 &&
			Object.keys(req.body).length === 0
		) {
			res.status(400).send({
				error: true,
				message: "Por favor forneça todos os campos obrigatórios.",
			});
		} else {
			const codigoCliente = req.params.codigo;
			const ano = req.body.ano;
			const mes = req.body.mes;

			Client.findById(codigoCliente, function (err, client) {
				if (err) res.send(err);
				else if (client) {
					scriptsController.restauracao_backup(
						codigoCliente,
						ano,
						mes
					);

					res.json({
						error: false,
						message: "Restauração iniciada com sucesso",
					});
				}
			});
		}
	},

	async definirHoraBackup(req, res) {
		if (
			req.body.constructor === Object &&
			Object.keys(req.query).length === 0
		) {
			res.status(400).send({
				error: true,
				message: "Por favor forneça todos os campos obrigatórios.",
			});
		} else {
			const codigoCliente = req.params.codigo;
			const horaBackup = req.query.hora_bkp_autm;

			Client.findById(codigoCliente, function (err, client) {
				if (err) res.send(err);
				else if (client) {
					const clienteSelecionado = client;
					const clienteAtualizado = new Client({
						...clienteSelecionado,
						hora_bkp_autm: horaBackup,
					});

					Client.update(
						req.params.codigo,
						new Client({ ...clienteAtualizado }),
						function (err, client) {
							if (err) res.send(err);
							scriptsController.backup_automatico();
							res.json({
								error: false,
								message: "Cliente atualizado com sucesso",
								client,
							});
						}
					);
				}
			});
		}
	},

	async validarSenha(req, res) {
		if (
			req.body.constructor === Object &&
			Object.keys(req.body).length === 0
		) {
			res.status(400).send({
				error: true,
				message: "Por favor forneça todos os campos obrigatórios.",
			});
		} else {
			const codigoCliente = req.params.codigo;

			if (Number(codigoCliente) === 1000) {
				res.status(400).send({
					error: true,
					message: "Login não disponível para esse cliente.",
				});
			} else {
				const senha = req.body.password_call;

				Client.validatePassword(
					codigoCliente,
					function (err, password_call) {
						if (err) res.send(err);
						else if (`${password_call}` === `${senha}`) {
							res.json({
								error: false,
								message: "Cliente autorizado",
							});
						} else {
							res.status(401).send({
								error: true,
								message: "Usuário ou senha inválidos.",
							});
						}
					}
				);
			}
		}
	},

	async alterarSenha(req, res) {
		if (
			req.body.constructor === Object &&
			Object.keys(req.body).length === 0 &&
			Object.keys(req.params).length === 0
		) {
			res.status(400).send({
				error: true,
				message: "Por favor forneça todos os campos obrigatórios.",
			});
			return;
		} else {
			const codigoCliente = req.params.codigo;
			const senha = req.body.password_call;
			const novaSenha = req.body.new_password_call;

			Client.findById(codigoCliente, function (err, client) {
				if (err) res.send(err);
				else if (client) {
					Client.validatePassword(
						codigoCliente,
						function (err, password_call) {
							if (err) res.send(err);
							else if (`${password_call}` === `${senha}`) {
								const clienteSelecionado = client;
								const clienteAtualizado = new Client({
									...clienteSelecionado,
									password_call: novaSenha,
								});

								Client.update(
									req.params.codigo,
									clienteAtualizado,
									function (err, client) {
										if (err) res.send(err);
										scriptsController.refazer_sip(
											codigoCliente
										);
										res.json({
											error: false,
											message:
												"Senha atualizada com sucesso",
											client,
										});
									}
								);
							} else {
								res.status(401).send({
									error: true,
									message: "Usuário ou senha inválidos.",
								});
							}
						}
					);
				}
			});
		}
	},

	async delete(req, res) {
		Client.delete(req.params.codigo, function (err, client) {
			if (err) res.send(err);
			res.json({ error: false, message: "Cliente removido com sucesso" });
		});
	},
};
