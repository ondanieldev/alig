import path from 'path';

interface IPathsConfig {
  imagesDir: string;
}

const pathsConfig: IPathsConfig = {
  imagesDir: path.resolve(__dirname, '..', '..', 'public', 'images'),
};

export default pathsConfig;
