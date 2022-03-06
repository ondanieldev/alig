import { Request, Response, NextFunction } from 'express';

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

    console.log(product);

    return response.status(200).json();
  }
}

export default Controllers;
