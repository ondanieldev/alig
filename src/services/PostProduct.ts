import IPostProduct from '../DTOs/IPostProduct';

class PostProduct {
  public async execute({ url }: IPostProduct): Promise<void> {
    console.log(url);
  }
}

export default PostProduct;
