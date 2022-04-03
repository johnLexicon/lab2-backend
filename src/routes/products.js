const productsRouter = require('express').Router();
const productsController = require('../controllers/productsController');
const { requireAuth } = require('../middleware/authMiddleware');

productsRouter.get('/', productsController.getAll);

productsRouter.get('/:id', productsController.get);

productsRouter.post('/', requireAuth, productsController.create);

productsRouter.patch('/:id', requireAuth, productsController.update);

productsRouter.delete('/:id', requireAuth, productsController.delete);

module.exports = productsRouter;
