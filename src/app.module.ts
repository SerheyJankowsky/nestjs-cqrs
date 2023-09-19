import { Module } from '@nestjs/common';
import { DBModule } from './db/db.module';
import { AccountModule } from './account/account.module';

@Module({
  imports: [DBModule, AccountModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
