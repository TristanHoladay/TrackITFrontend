export interface IRequest {
    id: number;
    details: string;
    date: Date;
    complete: boolean;
    companyId: number;
    company: string;
    resourceTypeId: number;
    resourceType: string;
    userId: string;
    user: string;
    requestT: string;
}
