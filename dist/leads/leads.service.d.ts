import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLeadDTO } from './dto/lead.customer.dto';
export declare class LeadsService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    createLead(CreateLeadDTO: CreateLeadDTO): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        firstname: string;
        lastname: string;
        email: string;
        phone: string;
        description: string;
        createdat: Date;
    }, unknown> & {}>;
    getAllLead(): Promise<{
        firstname: string;
        lastname: string;
        email: string;
        description: string;
    }[]>;
}
