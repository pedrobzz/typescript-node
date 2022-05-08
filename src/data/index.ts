import { DataSource, Repository } from "typeorm";
import { RequestEntity } from "./entity/Request";

const AppDataSource = new DataSource({
  synchronize: true,

  type: "postgres",
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [RequestEntity],
});

const initializeDatabase = async (): Promise<DataSource> => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource;
};

const getRequestRepo = async (): Promise<Repository<RequestEntity>> => {
  const dataSource = await initializeDatabase();
  return dataSource.getRepository(RequestEntity);
};

export default initializeDatabase;
export { AppDataSource, RequestEntity, getRequestRepo };
