import {classes} from './index.js';
import {configs} from '../../configs/index.js';
const {Memory, FileSystem, Sql, MongoDb, Firebase} = classes;
const {mySqlOptions, sqliteOptions, mongoDbConfigs} = configs;

export default function DbConnection(id) {
	this.instance =
		id == 1
			? new FileSystem()
			: id == 2
			? new Sql(mySqlOptions)
			: id == 3
			? new Sql(sqliteOptions)
			: id == 4
			? new MongoDb(mongoDbConfigs.localUrl, mongoDbConfigs.options)
			: id == 5
			? new MongoDb(mongoDbConfigs.atlasUrl, mongoDbConfigs.options)
			: id == 6
			? new Firebase()
			: new Memory();
}
