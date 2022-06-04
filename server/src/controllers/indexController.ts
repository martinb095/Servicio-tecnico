import { Request, Response } from 'express';

class IndexController {

    public index (req: Request, res: Response) {
        res.json('hoaaaa')
    }

}

export const indexController = new IndexController();