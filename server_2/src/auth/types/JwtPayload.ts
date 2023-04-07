import { Roles } from '@prisma/client';

export interface JwtPayload {
  email: string;
  id: string;
  role: Roles;
}
