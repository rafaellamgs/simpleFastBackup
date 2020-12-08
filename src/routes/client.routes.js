const express = require("express");

const router = express.Router();

const employeeController = require("../controllers/client.controller");

router.get("/", employeeController.findAll);

router.post("/", employeeController.create);

router.get("/:codigo", employeeController.findById);

router.put("/:codigo/ativar-backup", employeeController.ativarBackup);

router.put("/:codigo", employeeController.update);

router.delete("/:codigo", employeeController.delete);

module.exports = router;
