export interface DatabaseConfig {
  host: string;
  port: number;
  name: string;
  user: string;
  password: string;
  sync: boolean;
}

export default () => ({
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    name: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    sync: process.env.DATABASE_SYNC,
  },
});
