"use strict";
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

var dbConn = require("./../../config/db.config");

var Client = function (client) {
	this.codigo = client.codigo;
	this.nome = client.nome;
	this.password_call = client.password_call;
	this.usuario = client.usuario;
	this.password = client.password;
	this.ip = client.ip;
	this.origem_bkp = client.origem_bkp;
	this.uso_max_armaz = client.uso_max_armaz;
	this.porc_uso_armaz = client.porc_uso_armaz;
	this.perm_alerta = client.perm_alerta;
	this.perm_bkp_autm = client.perm_bkp_autm;
	this.hora_bkp_autm = client.hora_bkp_autm;
	this.apto_backup = client.apto_backup;
	this.user_block = client.user_block;
};

Client.create = function (newClient, result) {
	dbConn.query("INSERT INTO clientes set ?", newClient, function (err, res) {
		if (err) {
			console.log("error: ", err);
			result(err, null);
		} else {
			console.log(res.insertId);
			result(null, res.insertId);
		}
	});
};

Client.findById = async function (codigo, result) {
	dbConn.query(
		"Select * from clientes where codigo = ? ",
		codigo,
		function (err, res) {
			if (err) {
				console.log("error: ", err);
				result(err, null);
			} else {
				console.log("res :", res);
				result(null, res && res[0]);
			}
		}
	);
};

Client.validatePassword = async function (nome, result) {
	dbConn.query(
		"Select password_call, codigo from clientes where nome = ? ",
		nome,
		function (err, res) {
			if (err) {
				console.log("error: ", err);
				result(err, null);
			} else {
				console.log("res :", res);
				result(
					null,
					res &&
						res[0] && {
							password_call: res[0].password_call,
							codigo: res[0].codigo,
						}
				);
			}
		}
	);
};

Client.findAll = function (result) {
	dbConn.query("Select * from clientes", function (err, res) {
		if (err) {
			console.log("error: ", err);
			result(null, err);
		} else {
			console.log("clientes : ", res);
			result(null, res);
		}
	});
};

Client.update = function (codigo, client, result) {
	dbConn.query(
		"UPDATE clientes SET nome=?,password_call=?,usuario=?,password=?,ip=?,origem_bkp=?,uso_max_armaz=?,porc_uso_armaz=?,perm_alerta=?,perm_bkp_autm=?,hora_bkp_autm=?,apto_backup=?,user_block=?    WHERE codigo = ?",
		[
			client.nome,
			client.password_call,
			client.usuario,
			client.password,
			client.ip,
			client.origem_bkp,
			client.uso_max_armaz,
			client.porc_uso_armaz,
			client.perm_alerta,
			client.perm_bkp_autm,
			client.hora_bkp_autm,
			client.apto_backup,
			client.user_block,
			codigo,
		],
		function (err, res) {
			if (err) {
				console.log("error: ", err);
				result(null, err);
			} else {
				result(null, res);
			}
		}
	);
};

Client.delete = function (codigo, result) {
	dbConn.query(
		"DELETE FROM clientes WHERE codigo = ?",
		[codigo],
		function (err, res) {
			if (err) {
				console.log("error: ", err);
				result(null, err);
			} else {
				result(null, res);
			}
		}
	);
};

module.exports = Client;
