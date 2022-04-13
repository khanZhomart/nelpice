import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelpModule } from './common/modules/help.module';
import { SubscriberModule } from './common/modules/subscriber.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345',
      database: 'nelpicedb',
      autoLoadEntities: true,
      synchronize: true,
    }),
    HelpModule,
    SubscriberModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
