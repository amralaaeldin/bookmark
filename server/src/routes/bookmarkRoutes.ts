import express from 'express';
import { BookmarkController } from '../controllers';
import { isAuthenticated } from '../middleware';
import { storeBookmarkValidator, updateBookmarkValidator } from './../utils/validators/';

const routes = express.Router();
const bookmarkController = new BookmarkController();

routes.get('/bookmarks', isAuthenticated, bookmarkController.index);
routes.get('/bookmarks/:id', isAuthenticated, bookmarkController.show);
routes.post('/bookmarks', isAuthenticated, storeBookmarkValidator, bookmarkController.store);
routes.put('/bookmarks/:id', isAuthenticated, updateBookmarkValidator, bookmarkController.update);
routes.delete('/bookmarks/:id', isAuthenticated, bookmarkController.delete);

export { routes as bookmarkRoutes };
