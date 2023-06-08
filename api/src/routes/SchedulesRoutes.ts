
import {Router} from 'express';
import {SchedulesController} from '../controllers/SchedolesController'
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
class SchedulesRoutes{
  private router:Router;
  private schedulesController:SchedulesController;
 private authMiddleware: AuthMiddleware;
  constructor(){
    this.router = Router();
    this.schedulesController = new SchedulesController();
    this.authMiddleware = new AuthMiddleware();
  }
  getRoutes():Router{
    this.authMiddleware.auth.bind(this.authMiddleware),
    this.router.post('/', 
    this.schedulesController.store.bind(this.schedulesController),
  
    );
    this.authMiddleware.auth.bind(this.authMiddleware),
    this.router.get('/', 
    this.schedulesController.index.bind(this.schedulesController),
);
    this.authMiddleware.auth.bind(this.authMiddleware),
    this.router.put('/:id', 
    this.schedulesController.update.bind(this.schedulesController),
    );


    return this.router
}
}
export {SchedulesRoutes}