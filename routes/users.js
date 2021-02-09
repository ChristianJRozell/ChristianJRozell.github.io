let express = require('express');
let router = express.Router();
let controller = require('../Controllers/controller');

router.post('/register', controller.register);
/* GET users listing. */

module.exports = router;
