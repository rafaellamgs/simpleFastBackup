const express = require("express");

const router = express.Router();

const clientController = require("../controllers/client.controller");

const { validateJWT } = require("../utils/auth");

router.get("/", clientController.findAll);

router.post("/", clientController.create);

router.put("/login", clientController.validarSenha);

router.get("/:codigo", validateJWT, clientController.findById);

router.put(
	"/:codigo/ativar-backup",
	validateJWT,
	clientController.ativarBackup
);

router.put(
	"/:codigo/alterar-senha",
	validateJWT,
	clientController.alterarSenha
);

router.put(
	"/:codigo/ativar-notificacao",
	validateJWT,
	clientController.ativarNotificacao
);

router.put(
	"/:codigo/hora-backup",
	validateJWT,
	clientController.definirHoraBackup
);

router.put(
	"/:codigo/realizar-backup",
	validateJWT,
	clientController.realizarBackup
);

router.put(
	"/:codigo/restaurar-backup",
	validateJWT,
	clientController.restaurarBackup
);

router.put("/:codigo", validateJWT, clientController.update);

router.delete("/:codigo", validateJWT, clientController.delete);

module.exports = router;
