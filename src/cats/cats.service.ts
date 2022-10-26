import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Cat, Prisma } from '@prisma/client';

@Injectable()
export class CatsService {
  constructor(private prisma: PrismaService) {}
  // create(createCatDto: CreateCatDto) {
  //   return 'This action adds a new cat';
  // }
  async createUser(data: Prisma.CatCreateInput): Promise<Cat> {
    const foundCat = await this.prisma.cat.findUnique({
      where: { email: data.email },
    });

    if(foundCat) {
      throw new BadRequestException('Cat already exists');
    } else {
      return this.prisma.cat.create({
        data,
      });
    }
  }

  async update(params: {
    where: Prisma.CatWhereUniqueInput;
    data: Prisma.CatUpdateInput;
  }): Promise<Cat> {
    const { data, where } = params;
    return this.prisma.cat.update({
      data,
      where,
    });
  }

  findAll() {
    return this.prisma.cat.findMany();
  }

  findOne(id: number) {
    return this.prisma.cat.findUnique({
      where: { id },
    });
  }

  remove(where: Prisma.CatWhereUniqueInput): Promise<Cat> {
    return this.prisma.cat.delete({
      where,
    });
  }
}
