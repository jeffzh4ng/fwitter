import { DynamicModule } from '@nestjs/common'
import { RedisModule, RedisModuleOptions } from 'nestjs-redis'
import { ConfigModule, ConfigService } from '@nestjs/config'

export const Redis: DynamicModule = RedisModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService): RedisModuleOptions => {
    if (configService.get('REDISCLOUD_URL')) {
      // TODO: change this check to a node_env === prod check, not this specific env var
      return {
        url: configService.get('REDISCLOUD_URL'),
      }
    } else {
      return {
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
      }
    }
  },
})
