import { type User } from "../models/user/userModel.ts";
import { type UserRepository } from "../repositories/user/interface.ts";
import { CreateUserInput } from "../schemas/userSchema.ts";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  createUser(input: CreateUserInput): Promise<User> {
    return this.userRepository.create(input);
  }

  getUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }
}
