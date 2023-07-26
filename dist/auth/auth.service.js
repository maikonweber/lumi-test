"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const customer_service_1 = require("../customer/customer.service");
const jwt_1 = require("@nestjs/jwt");
let AuthService = exports.AuthService = AuthService_1 = class AuthService {
    constructor(customerService, jwtService) {
        this.customerService = customerService;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async loginIn(username, password) {
        this.logger.log("Try Login With", username);
        const users = await this.customerService.getUserAndPassword(username, password);
        if (!users)
            throw new common_1.NotAcceptableException('could not find the user');
        const access_token = await this.jwtService.signAsync({
            username: users.username,
            email: users.email,
            id: users.id,
            usecase: users.usecase
        });
        return {
            access_token: access_token,
            usecase: users.usecase
        };
    }
};
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [customer_service_1.CustomerService, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map