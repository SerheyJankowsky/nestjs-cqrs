import { Module } from '@nestjs/common';
import { DBModule } from './db/db.module';
import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AuthGuardModule } from '@guards/auth/authGuard.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env.example', isGlobal: true }),
    AuthGuardModule,
    DBModule,
    AccountModule,
    AuthModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
