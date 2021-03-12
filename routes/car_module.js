let express = require("express");
let router = express.Router();

let car_controller = require("../Controllers/controller");

router.post("/", car_controller.car_list);
router.get("/", car_controller.render_garage);
router.get("/garage", car_controller.render_garage);
router.post("/delete", car_controller.delete);
module.exports = router;
