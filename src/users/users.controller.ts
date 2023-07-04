/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { loginDetails } from '../types/loginDetails';
import { registerDetails } from '../types/registerDetails';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  async registerUser(@Body() userDetails: registerDetails) {
    return this.usersService.registerUser(userDetails);
  }

  @Post('login')
  async loginUser(@Body() userDetails: loginDetails) {
    return this.usersService.loginUser(userDetails);
  }
}
