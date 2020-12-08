"use strict";

const Client = require("../models/client.model");
exports.findAll = function (req, res) {
	console.log("res :", res);
	console.log("req :", req);
	Client.findAll(function (err, client) {
		console.log("controller");
		if (err) res.send(err);
		console.log("res", client);
		res.send(client);
	});
};

exports.create = function (req, res) {
	const new_employee = new Client(req.body);
	//handles null error
	if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
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
};

exports.findById = function (req, res) {
	Client.findById(req.params.codigo, function (err, client) {
		if (err) res.send(err);
		res.json(client);
	});
};

exports.update = function (req, res) {
	if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
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
};

exports.ativarBackup = async function (req, res) {
	if (req.body.query === Object && Object.keys(req.query).length === 0) {
		res.status(400).send({
			error: true,
			message: "Por favor forneça todos os campos obrigatórios.",
		});
	} else {
		console.log("req.params :", req.params);
		const codigoCliente = req.params.codigo;
		console.log("codigoCliente :", codigoCliente);

		const clienteSelecionado = await Client.findById(
			codigoCliente,
			function (err, client) {
				if (err) res.send(err);
				res.json(client);
			}
		);

		console.log("clienteSelecionado :", clienteSelecionado);
		res.send("err");
		// Client.update(
		// 	codigoCliente,
		// 	new Client(req.body),
		// 	function (err, client) {
		// 		if (err) res.send(err);
		// 		res.json({
		// 			error: false,
		// 			message: "Cliente atualizado com sucesso",
		// 		});
		// 	}
		// );
	}
};

exports.delete = function (req, res) {
	Client.delete(req.params.codigo, function (err, client) {
		if (err) res.send(err);
		res.json({ error: false, message: "Cliente removido com sucesso" });
	});
};
