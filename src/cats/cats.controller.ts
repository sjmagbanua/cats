import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UsePipes } from '@nestjs/common';
import { Cat } from '@prisma/client';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  userService: any;
  constructor(private readonly catsService: CatsService) {}

  @Post('create')
  async signupUser(
    @Body() userData: { email: string, name: string, age: number },
  ): Promise<Cat> {
    return this.catsService.createUser(userData);
  }
  
  @Get()
  findAll() {
    return this.catsService.findAll();
  } 

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() catdetails: { email: string; name: string; age: number },
  ): Promise<Cat> {
    const { name, age, email } = catdetails;
    return this.catsService.update({
      where: { id: Number(id) },
      data: { name: String(name), age: Number(age), email: String(email)},
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Cat> {
    return this.catsService.remove({ id: Number(id) });
  }
}
