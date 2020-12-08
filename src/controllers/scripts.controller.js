const { exec } = require("child_process");

module.exports = {
	teste() {
		exec("ls -la", (error, stdout, stderr) => {
			if (error) {
				console.log(`error: ${error.message}`);
				return;
			}
			if (stderr) {
				console.log(`stderr: ${stderr}`);
				return;
			}
			console.log(`stdout: ${stdout}`);
		});
	},

	backup_automatico() {
		exec(
			"~/scripts_voip/scripts_backups/backup_automatico.sh",
			(error, stdout, stderr) => {
				if (error) {
					console.log(`error: ${error.message}`);
					return;
				}
				if (stderr) {
					console.log(`stderr: ${stderr}`);
					return;
				}
				console.log(`stdout: ${stdout}`);
			}
		);
	},

	refazer_sip(codigo) {
		exec(
			`~/servidor_backup/scripts_voip/refazer_sip.sh ${codigo}`,
			(error, stdout, stderr) => {
				if (error) {
					console.log(`error: ${error.message}`);
					return;
				}
				if (stderr) {
					console.log(`stderr: ${stderr}`);
					return;
				}
				console.log(`stdout: ${stdout}`);
			}
		);
	},

	realizacao_backup(codigo) {
		exec(
			`~/scripts_voip/scripts_backups/realizacao_backup.sh ${codigo}`,
			(error, stdout, stderr) => {
				if (error) {
					console.log(`error: ${error.message}`);
					return;
				}
				if (stderr) {
					console.log(`stderr: ${stderr}`);
					return;
				}
				console.log(`stdout: ${stdout}`);
			}
		);
	},

	restauracao_backup(codigo, ano, mes) {
		exec(
			`~/scripts_voip/scripts_backups/restauracao_backup.sh ${codigo} ${ano} ${mes}`,
			(error, stdout, stderr) => {
				if (error) {
					console.log(
						`error: ${error}, stdout: ${stdout}, stderr: ${stderr}`
					);
					return;
				}
				if (stderr) {
					console.log(`stderr: ${stderr}`);
					return;
				}
				console.log(`stdout: ${stdout}`);
			}
		);
	},
};
