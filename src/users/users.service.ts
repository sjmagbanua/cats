import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

// This should be a real class/interface representing a user entity
// export type User = {
//     id: number;
//     name: string;
//     username: string;
//     password: string;
// }
@Injectable()
export class UsersService {
  // remove(arg0: { id: number; }): User | PromiseLike<User> {
  //   throw new Error("Method not implemented.");
  // }
  constructor(private prisma: PrismaService) {}
  // private readonly users: User[] = [
  //   {
  //     id: 1,
  //     name: "Snickers",
  //     username: 'john',
  //     password: 'changeme',
  //   },
  //   {
  //     id: 2,
  //     name: "joshua",
  //     username: 'maria',
  //     password: 'guess',
  //   },
  // ];

  async createUsers(data: Prisma.UserCreateInput): Promise<User> {
    const foundUser = await this.prisma.user.findUnique({
      where: { email: data.email},
    })
    
    if(foundUser) {
      throw new BadRequestException('User already exists');
    } else {
      return this.prisma.user.create({
        data,
      });
    }
  } 

  findAll() {
    return this.prisma.user.findMany();
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { data, where } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  remove(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }

  async findById(id: number): Promise<User | undefined> {
    console.log(id);
    return this.prisma.user.findUnique({
      where: { id },
    })
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({
          where: { email },
         });
  }
}