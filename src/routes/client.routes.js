const express = require("express");

const router = express.Router();

const clientController = require("../controllers/client.controller");

router.get("/", clientController.findAll);

router.post("/", clientController.create);

router.get("/:codigo", clientController.findById);

router.put("/:codigo/ativar-backup", clientController.ativarBackup);

router.put("/:codigo/login", clientController.validarSenha);

router.put("/:codigo/alterar-senha", clientController.alterarSenha);

router.put("/:codigo/ativar-notificacao", clientController.ativarNotificacao);

router.put("/:codigo/hora-backup", clientController.definirHoraBackup);

router.put("/:codigo/realizar-backup", clientController.realizarBackup);

router.put("/:codigo/restaurar-backup", clientController.restaurarBackup);

router.put("/:codigo", clientController.update);

router.delete("/:codigo", clientController.delete);

module.exports = router;
