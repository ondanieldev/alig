import { Request, Response, NextFunction } from 'express';

import IPostProduct from '../DTOs/IPostProduct';
import PostProduct from '../services/PostProduct';

class Controllers {
  public async postProduct(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { body } = request;

    const postProduct = new PostProduct();
    await postProduct.execute(body as unknown as IPostProduct);
    return response.status(200).json();
  }
}

export default Controllers;
