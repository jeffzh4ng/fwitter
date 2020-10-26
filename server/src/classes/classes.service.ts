import { HttpService, Injectable, InternalServerErrorException, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Class } from './class.entity'

@Injectable()
export class ClassesService {
  private readonly logger = new Logger(ClassesService.name)

  constructor(
    private httpService: HttpService,
    @InjectRepository(Class) private classesRepository: Repository<Class>,
    private configService: ConfigService
  ) {}

  async findAll(): Promise<Array<Class>> {
    try {
      const classes = await this.classesRepository.find({ take: 100 })
      // const compressedClasses = this.compressClasses(classes)

      return classes
    } catch (e) {
      this.logger.error(e)
      throw new InternalServerErrorException()
    }
  }

  async findOne(classId: number) {
    try {
      const c = await this.classesRepository.findOne({ where: { id: classId } })
      return c
    } catch (e) {
      this.logger.error(e)
      throw new InternalServerErrorException()
    }
  }

  async updateClasses() {
    try {
      const classes = await this.fetchClasses()
      await this.upsertClasses(classes)
    } catch (e) {
      this.logger.error(e)
      throw new InternalServerErrorException()
    }
  }

  private async fetchClasses() {
    const API_DOMAIN = this.configService.get('WATERLOO_API_URL')
    const API_KEY = this.configService.get('WATERLOO_API_KEY')

    const FALL_TERM = 1209
    const URL = `${API_DOMAIN}/terms/${FALL_TERM}/courses.json?key=${API_KEY}`

    const res = await this.httpService.get(URL).toPromise()

    const rawClasses = res.data.data
    const classes = rawClasses
      .map(rawClass => {
        return {
          subject: rawClass.subject,
          code: rawClass.catalog_number,
          name: rawClass.title,
        }
      })
      .filter(c => {
        if (!c.subject || !c.code || !c.name) return false

        return true
      })

    return classes
  }

  private async upsertClasses(classes: Array<Class>) {
    try {
      // TODO: replace with upsert to reduce db hits from 2 -> 1
      for (const c of classes) {
        // using c instead of "class" bc class is a reserved word in JS
        const cls = await this.classesRepository.findOne({
          where: {
            subject: c.subject,
            code: c.code,
          },
        })

        if (!cls) {
          const createdClass = await this.classesRepository.create({
            ...c,
          })

          await this.classesRepository.save(createdClass)
        }
      }
    } catch (e) {
      this.logger.error(e)

      throw new InternalServerErrorException()
    }
  }
}
