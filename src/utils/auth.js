const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

module.exports = {
	getToken(id) {
		return jwt.sign({ id }, process.env.SECRET, {
			expiresIn: 3000, // expires in 5min
		});
	},

	validateJWT(req, res, next) {
		const token = req.headers["x-access-token"];
		if (!token)
			return res
				.status(401)
				.json({ auth: false, message: "Não foi fornecido um token." });

		jwt.verify(token, process.env.SECRET, function (err, decoded) {
			if (err)
				return res.status(500).json({
					auth: false,
					message: "Erro ao validar token.",
				});

			req.codigo = decoded.codigo;
			next();
		});
	},
};
