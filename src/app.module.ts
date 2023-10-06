import { Module } from '@nestjs/common';
import { PrismaModule } from './common/database';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/auth/jwt-auth.guard';
import { AuthModule } from './common/auth/auth.module';
import { CollectionModule } from './models/collection/collection.module';
import patch from './common/patch';

@Module({
  imports: [PrismaModule, AuthModule, CollectionModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {
  constructor() {
    patch();
  }
}
