import { CustomerService } from 'src/customer/customer.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private customerService;
    private jwtService;
    private readonly logger;
    constructor(customerService: CustomerService, jwtService: JwtService);
    loginIn(username: string, password: string): Promise<any>;
}
