"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const dotenv = require("dotenv");
const app_module_1 = require("./app.module");
const users_service_1 = require("./users/users.service");
const disputes_service_1 = require("./disputes/disputes.service");
const user_entity_1 = require("./users/user.entity");
async function bootstrap() {
    dotenv.config();
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const usersService = app.get(users_service_1.UsersService);
    const disputesService = app.get(disputes_service_1.DisputesService);
    const admin = await usersService.create({
        email: 'admin@creditveto.com',
        password: 'adminpass',
        role: user_entity_1.UserRole.ADMIN,
    });
    const user = await usersService.create({
        email: 'user@creditveto.com',
        password: 'userpass',
        role: user_entity_1.UserRole.USER,
    });
    await disputesService.createDispute({
        title: 'Incorrect late payment',
        description: 'A late payment was reported in error.',
    }, user);
    await disputesService.createDispute({
        title: 'Fraudulent account',
        description: 'An account I did not open appears on my report.',
    }, user);
    await app.close();
    console.log('Seeding complete.');
}
bootstrap();
//# sourceMappingURL=seed.js.map