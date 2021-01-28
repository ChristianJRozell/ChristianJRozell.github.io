let express = require('express');
let router = express.Router();

let car_controller = require('../Controllers/controller');

router.post('/', car_controller.car_list);

module.exports = router;
