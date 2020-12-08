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
};
