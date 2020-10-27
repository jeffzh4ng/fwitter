import { DynamicModule } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

export const TypeOrm: DynamicModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const DB_URL = configService.get('DATABASE_URL')

    if (DB_URL) {
      return {
        type: 'postgres',
        url: DB_URL,
        entities: ['dist/**/*.entity{.ts,.js}'],
      }
    } else {
      return {
        type: 'postgres',
        host: 'postgres',
        port: 5432,
        username: 'fwitter',
        password: 'fwitter',
        database: 'fwitter',
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
      }
    }
  },
})
