import { HttpModule, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Class } from './class.entity'
import { ClassesResolver } from './classes.resolver'
import { ClassesService } from './classes.service'

@Module({
  imports: [TypeOrmModule.forFeature([Class]), HttpModule, ConfigModule],
  providers: [ClassesResolver, ClassesService],
  exports: [ClassesService],
})
export class ClassesModule {}
