"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const customer_module_1 = require("../customer/customer.module");
const customer_service_1 = require("../customer/customer.service");
const local_auth_1 = require("./local.auth");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const jwtConstant_1 = require("./jwtConstant");
let AuthModule = exports.AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [customer_module_1.CustomerModule, jwt_1.JwtModule.register({
                global: true,
                secret: jwtConstant_1.jwtConstants.secret,
                signOptions: { expiresIn: '5d' }
            })],
        providers: [auth_service_1.AuthService, customer_service_1.CustomerService, local_auth_1.LocalStrategy, prisma_service_1.PrismaService],
        exports: [auth_service_1.AuthService]
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map