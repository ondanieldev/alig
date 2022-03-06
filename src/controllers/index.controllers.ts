import { Request, Response, NextFunction } from 'express';
import PostProduct from 'services/PostProduct';

import IRequest from '../DTOs/IRequest';
import GetProductInfo from '../services/GetProductInfo';

class Controllers {
  public async postProduct(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { body } = request;

    const getProductInfo = new GetProductInfo();
    const product = await getProductInfo.execute(body as unknown as IRequest);

    const postProduct = new PostProduct();
    await postProduct.execute(product);

    return response.status(200).json();
  }
}

export default Controllers;
