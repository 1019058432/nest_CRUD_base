import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'nest_crud',
  // entities: [`${__dirname}/../entity/**/*.{js,ts}`],
  entities: [`${__dirname}/../modules/**/*.entity.{js,ts}`],
  synchronize: false,
  logging: ["error"],
}

/**
 * 根据已有数据库生成实体命令
 * npx typeorm-model-generator -h localhost -d your-mysql-db -u root -x your-mysql-password -e mssql -o .
 */