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
var AuthGuardService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuardService = void 0;
const jwt_1 = require("@nestjs/jwt");
const common_1 = require("@nestjs/common");
const jwtConstant_1 = require("./jwtConstant");
const customer_service_1 = require("../customer/customer.service");
let AuthGuardService = exports.AuthGuardService = AuthGuardService_1 = class AuthGuardService {
    constructor(jwtService, customerService) {
        this.jwtService = jwtService;
        this.customerService = customerService;
        this.logger = new common_1.Logger(AuthGuardService_1.name);
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token)
            throw new common_1.UnauthorizedException();
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: jwtConstant_1.jwtConstants.secret
            });
            request['user'] = payload;
            await this.customerService.checkUsersExist(payload);
        }
        catch {
            throw new common_1.UnauthorizedException();
        }
        return true;
    }
    extractTokenFromHeader(request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === "Bearer" ? token : undefined;
    }
};
exports.AuthGuardService = AuthGuardService = AuthGuardService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService, customer_service_1.CustomerService])
], AuthGuardService);
function validateRequest(request) {
    throw new Error('Function not implemented.');
}
//# sourceMappingURL=authGuard.js.map