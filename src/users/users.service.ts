/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../types/user';
import { loginDetails } from '../types/loginDetails';
import * as bcrypt from 'bcrypt';
import { registerDetails } from '../types/registerDetails';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async registerUser(userDetails: registerDetails) {
    const { name, email, password } = userDetails;
    if (!name || !email || !password) {
      throw new HttpException(
        'All credentials are required!',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      // check the db
      const user = await this.userModel.findOne({ email });
      if (user)
        throw new HttpException('User already exists!', HttpStatus.BAD_REQUEST);
      const newUser = await this.userModel.create({
        name,
        email,
        password,
      });

      if (!newUser)
        throw new HttpException(
          'Internal server error...',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      return newUser.depopulate('password');
    }
  }

  async loginUser(userDetails: loginDetails) {
    const { email, password } = userDetails;
    if (!email || !password) {
      throw new HttpException(
        'All credentials required!',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const user = await this.userModel.findOne({ email });
      if (!user)
        throw new HttpException(
          'Invalid email or password!',
          HttpStatus.BAD_REQUEST,
        );
      if (await bcrypt.compare(password, user.password)) {
        const payload = { email: user.email, password: user.password };
        return {
          token: this.jwtService.sign(payload, { secret: 'thisisasecret' }),
          username: user.name,
          email: user.email,
        };
      } else {
        throw new HttpException(
          'Invalid email or password',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  async validateUser(email: string, password: string): Promise<any> {
    console.log(
      `[AuthService] validateUser: email=${email}, password=${password}`,
    );
    const user = await this.userModel.findOne({ email });
    if (!user) throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
  }
}
