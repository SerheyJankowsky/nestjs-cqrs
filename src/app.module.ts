import { Module } from '@nestjs/common';
import { DBModule } from './db/db.module';
import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DBModule, AccountModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
