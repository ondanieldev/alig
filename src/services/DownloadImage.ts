import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { v4 } from 'uuid';

import pathsConfig from 'config/paths.config';

class DownloadImage {
  public async execute(url: string): Promise<string> {
    const imageName = `${v4()}.jpg`;
    const imagePath = path.resolve(pathsConfig.imagesDir, imageName);

    const writer = fs.createWriteStream(imagePath);
    const response = await axios.get(url, {
      responseType: 'stream',
    });
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', () => resolve(imageName));
      writer.on('error', reject);
    });
  }
}

export default DownloadImage;
