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
var CustomerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerService = void 0;
const prisma_service_1 = require("../prisma/prisma.service");
const common_1 = require("@nestjs/common");
const crypto = require("bcrypt");
let CustomerService = exports.CustomerService = CustomerService_1 = class CustomerService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(CustomerService_1.name);
    }
    async createUserLog(UserLogDto) {
        const user = await this.prisma.user.findFirstOrThrow({
            where: {
                id: UserLogDto.userid
            }
        });
        const log = await this.prisma.userlog.create({
            data: {
                userid: UserLogDto.userid,
                action: UserLogDto.action,
            }
        });
        return log;
    }
    async createSessionCookie(SessionCookieDto) {
        const session = await this.prisma.cookie.create({
            data: {
                userid: SessionCookieDto.userid,
                value: SessionCookieDto.value,
            }
        });
        return session;
    }
    async createUser(CreateCustomerDto) {
        const { hash, salt } = await this.hashPassword(CreateCustomerDto.password);
        try {
            await this.prisma.$transaction(async (prismaTx) => {
                const users = await prismaTx.user.create({
                    data: {
                        username: CreateCustomerDto.username,
                        email: CreateCustomerDto.email,
                    }
                });
                const newPass = await prismaTx.passwordhash.create({
                    data: {
                        userid: users.id,
                        hash: hash,
                        salt: salt
                    }
                });
                const waller = await prismaTx.wallet.create({
                    data: {
                        userid: users.id
                    }
                });
            }, {
                isolationLevel: 'Serializable',
                maxWait: 5000,
                timeout: 5000
            });
            return "Criou";
        }
        catch (error) {
            return error;
        }
    }
    async getAllSession(userid) {
        const coookie = await this.prisma.cookie.findMany({
            where: {
                userid: userid
            },
            include: {
                user: true
            }
        });
        this.logger.log(coookie);
        return coookie;
    }
    async getCurrentWallet(userid) {
        const wallet = await this.prisma.wallet.findUnique({
            where: {
                userid: userid
            }
        });
        return wallet;
    }
    async getCookieSession(value) {
        const cookie = await this.prisma.cookie.findFirstOrThrow({
            where: {
                value: value
            },
            include: {
                user: true
            }
        });
        return cookie;
    }
    async getUserAndPassword(email, password) {
        const users = await this.prisma.user.findFirstOrThrow({
            where: {
                email: email
            },
            include: {
                passwordhash: true
            },
        });
        const hash = await this.encryptPassword(password, users.passwordhash.salt);
        if (hash != users.passwordhash.hash) {
            throw new common_1.UnauthorizedException('You need help to login in your account');
        }
        return users;
    }
    async getUser(id) {
        return await this.prisma.user.findFirstOrThrow({
            where: {
                id: id
            },
            include: {
                passwordhash: true,
            }
        });
    }
    async hashPassword(password) {
        try {
            const saltRound = 10;
            const salt = await crypto.genSalt(saltRound);
            const hash = await crypto.hash(password, salt);
            this.logger.log('Hash Generated');
            return {
                hash,
                salt
            };
        }
        catch (error) {
            this.logger.error(error);
        }
    }
    async checkUsersExist(payload) {
        return this.prisma.user.findFirstOrThrow({
            where: {
                email: payload.email,
            },
            select: {
                id: true,
                usecase: true,
            }
        });
    }
    async encryptPassword(newPass, salt) {
        try {
            const hash = await crypto.hash(newPass, salt);
            return hash;
        }
        catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
};
exports.CustomerService = CustomerService = CustomerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CustomerService);
//# sourceMappingURL=customer.service.js.map