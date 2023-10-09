import { Module } from '@nestjs/common';
import { DBModule } from './db/db.module';
import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AuthGuardModule } from '@guards/auth/authGuard.module';
import { CategoryModule } from './category/category.module';
import { ThingModule } from './thing/thing.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env.example', isGlobal: true }),
    AuthGuardModule,
    DBModule,
    AccountModule,
    AuthModule,
    CategoryModule,
    ThingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
