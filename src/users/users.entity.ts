import { UserRole } from 'src/types/userRoles.type';

export interface UserEntity {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}
