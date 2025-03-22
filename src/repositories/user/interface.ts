import { User } from '../../models/user/userModel.ts';

export interface UserRepository {
  create(user: Omit<User, 'id'>): Promise<User>;
  findById(id: string): Promise<User | null>;
}
