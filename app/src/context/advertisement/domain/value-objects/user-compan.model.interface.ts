export interface UserCompanyInterface {
    id: number;
    userId: number;
    companyId: number;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string; // Campo opcional
    role: 'admin' | 'employee' | 'manager';
    createdAt: Date;
    updatedAt: Date;
    status: number;
  }
  