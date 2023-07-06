/* eslint-disable prettier/prettier */
import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { loginDetails } from '../types/loginDetails';
import { registerDetails } from '../types/registerDetails';
import { LocalAuthGuard } from 'src/auth/LocalAuthGuard';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  async registerUser(@Body() userDetails: registerDetails) {
    return this.usersService.registerUser(userDetails);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async loginUser(@Body() userDetails: loginDetails) {
    return this.usersService.loginUser(userDetails);
  }


  // @UseGuards(LocalAuthGuard)
  @Get('profile/:id')
  async getProfile(@Param('id') id: string) {
    return this.usersService.getProfile(id);
  }
}
