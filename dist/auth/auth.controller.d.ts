import { AuthService } from './auth.service';
import { LoginCustomerDto } from '../customer/dto/create-customer.dto';
export declare class AuthController {
    private authService;
    private readonly logger;
    constructor(authService: AuthService);
    login(LoginCustomerDto: LoginCustomerDto): Promise<any>;
    test(req: any): Promise<string>;
}
