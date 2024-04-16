export type DataSource = 'memory' | 'database';

export interface DefaultConfig {
  dataSource: DataSource;
  port: number;
}

const DEFAULT_PORT_APP = 3000;

export const defaultConfig = (): DefaultConfig => {
  if (
    process.env.DATASOURCE !== 'memory' &&
    process.env.DATASOURCE !== 'database'
  ) {
    throw new Error('Datasource env var is invalid');
  }

  return {
    dataSource: process.env.DATASOURCE === 'memory' ? 'memory' : 'database',
    port: parseInt(process.env.PORT, 10) ?? DEFAULT_PORT_APP,
  };
};
