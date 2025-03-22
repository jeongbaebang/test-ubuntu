import { type UserRepository } from "./interface.ts";
import { type User } from "../../models/user/userModel.ts";

export class LocalUserRepository implements UserRepository {
  private users: User[] = [];

  create(user: Omit<User, "id">): Promise<User> {
    return new Promise((resolve) => {
      const newUser = { ...user, id: crypto.randomUUID() };
      this.users.push(newUser);
      resolve(newUser);
    });
  }

  findById(id: string): Promise<User | null> {
    return new Promise((resolve) => {
      resolve(this.users.find((user) => user.id === id) || null);
    });
  }
}
