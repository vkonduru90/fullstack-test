# node-sequelize-mysql
Nodejs, ExpressJs, MySQL, Sequelize


## Insert Into Users DB 

Create Schema with name 'test'

Set required config in "config\config.json" file and execute below command.
Set DB Creds in config-default.json file.

start the server before running below script. Make sure tables are created in schema.

npx sequelize-cli db:seed --seed 20201129090806-userInserts
npx sequelize-cli db:seed --seed 20201129130405-statistics

user name - vkonduru90@gmail.com
password - 123456

You can find the routes in request.http file.