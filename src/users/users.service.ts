import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = {
    id: number;
    name: string;
    username: string;
    password: string;
}

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      name: "Snickers",
      username: 'john',
      password: 'changeme',
    },
    {
      id: 2,
      name: "joshua",
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}