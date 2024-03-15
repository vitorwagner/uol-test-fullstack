import type {Config} from 'jest';

const config: Config = {
  verbose: true,
  transform: {
    '\\.js$': ['babel-jest', { configFile: './babel-jest.config.js' }],
  },
};



export default config;