import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { CustomerService } from 'src/customer/customer.service';
export declare class AuthGuardService implements CanActivate {
    private jwtService;
    private customerService;
    private readonly logger;
    constructor(jwtService: JwtService, customerService: CustomerService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
