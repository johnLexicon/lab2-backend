const productsRouter = require('express').Router();
const productsController = require('../controllers/productsController');

productsRouter.get('/', productsController.getAll);

productsRouter.get('/:id', productsController.get);

productsRouter.post('/', productsController.create);

productsRouter.patch('/:id', productsController.update);

productsRouter.delete('/:id', productsController.delete);

module.exports = productsRouter;
