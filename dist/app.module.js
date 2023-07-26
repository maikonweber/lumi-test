"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const schedule_1 = require("@nestjs/schedule");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_controller_1 = require("./auth/auth.controller");
const auth_module_1 = require("./auth/auth.module");
const jwtConstant_1 = require("./auth/jwtConstant");
const customer_module_1 = require("./customer/customer.module");
const leads_module_1 = require("./leads/leads.module");
const prisma_module_1 = require("./prisma/prisma.module");
const prisma_service_1 = require("./prisma/prisma.service");
const redis_1 = require("./redis/redis");
const cron_1 = require("./schedule/cron");
const logger_middleware_1 = require("./logger.middleware");
const FutbolUpdate_1 = require("./redis/FutbolUpdate");
const websocket_module_1 = require("./websocket/websocket.module");
let AppModule = exports.AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes('*');
    }
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            prisma_module_1.PrismaModule,
            customer_module_1.CustomerModule,
            auth_module_1.AuthModule,
            leads_module_1.LeadsModule,
            websocket_module_1.WebsocketModule,
            jwt_1.JwtModule.register({
                secret: jwtConstant_1.jwtConstants.secret,
                signOptions: { expiresIn: '5d' }
            }),
        ],
        controllers: [app_controller_1.AppController, auth_controller_1.AuthController],
        providers: [
            redis_1.RedisService,
            FutbolUpdate_1.FutbolUpdadeService,
            app_service_1.default,
            redis_1.RedisService,
            prisma_service_1.PrismaService,
            cron_1.TasksService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map