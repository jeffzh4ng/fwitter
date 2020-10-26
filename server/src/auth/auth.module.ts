import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { GoogleStrategy } from './google.strategy'
import { AuthController } from './auth.controller'
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from 'src/users/users.module'

@Module({
  imports: [ConfigModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy],
})
export class AuthModule {}
