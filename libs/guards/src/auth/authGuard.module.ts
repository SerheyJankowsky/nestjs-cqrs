import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '@guards/auth/configs/jwt.config';

@Global()
@Module({
  imports: [JwtModule.registerAsync(jwtConfig())],
  providers: [],
  exports: [JwtModule],
})
export class AuthGuardModule {}
