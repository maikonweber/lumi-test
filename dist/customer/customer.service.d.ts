import { CreateCustomerDto, SessionCookieDto } from './dto/create-customer.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserLogDto } from './dto/create-customer.dto';
export declare class CustomerService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    createUserLog(UserLogDto: UserLogDto): Promise<any>;
    createSessionCookie(SessionCookieDto: SessionCookieDto): Promise<any | undefined>;
    createUser(CreateCustomerDto: CreateCustomerDto): Promise<string | void>;
    getAllSession(userid: number): Promise<any | undefined>;
    getCurrentWallet(userid: number): Promise<any>;
    getCookieSession(value: string): Promise<any>;
    getUserAndPassword(email: string, password: string): Promise<any>;
    getUser(id: number): Promise<any>;
    hashPassword(password: string): Promise<any>;
    checkUsersExist(payload: any): Promise<any>;
    encryptPassword(newPass: string, salt: string): Promise<string>;
}
