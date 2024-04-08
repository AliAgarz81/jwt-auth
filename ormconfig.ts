import { User } from "src/entities/user.entity";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

const config: MysqlConnectionOptions = {
    type: 'mysql',
    database: 'authDB',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    entities: [User],
    synchronize: true,
};

export default config;