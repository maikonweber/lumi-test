import { CreateLeadDTO } from './dto/lead.customer.dto';
import { LeadsService } from './leads.service';
export declare class LeadsController {
    private readonly LeadService;
    private readonly logger;
    constructor(LeadService: LeadsService);
    createLeads(CreateLeadDTO: CreateLeadDTO): Promise<any>;
    getAllLead(): Promise<{
        firstname: string;
        lastname: string;
        email: string;
        description: string;
    }[]>;
}
