import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../Models/user.schema';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/auth/LocalStrategy';
import { JwtService } from '@nestjs/jwt/dist';
// import {JwtStrategy} from 'src/auth/JwtStrategy'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    PassportModule.register({
      secret: 'thisisasecret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [UsersService, LocalStrategy, JwtService],
  controllers: [UsersController],
})
export class UsersModule {}
