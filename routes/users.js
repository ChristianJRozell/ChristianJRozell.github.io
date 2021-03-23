let express = require("express");
let router = express.Router();
let controller = require("../Controllers/controller");

router.post("/dash", controller.dash);
router.get("/dash", controller.dash);
router.post("/dashboard", controller.dashboard);
router.get("/dashboard", controller.dashboard);
router.get("/register", controller.register);
router.get("/", controller.login);
router.get("/logout", controller.logout);

/* GET users listing. */

module.exports = router;
