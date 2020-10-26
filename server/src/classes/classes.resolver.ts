import { UseGuards } from '@nestjs/common'
import { Resolver, Query } from '@nestjs/graphql'
import { GraphqlAuthGuard } from 'src/guards/auth.guard'
import { Class } from './class.entity'
import { ClassesService } from './classes.service'

@UseGuards(GraphqlAuthGuard)
@Resolver(of => Class)
export class ClassesResolver {
  constructor(private classesService: ClassesService) {}

  @Query(returns => [Class], { name: 'classes' })
  async getClasses() {
    const classes = await this.classesService.findAll()
    return classes
  }
}
