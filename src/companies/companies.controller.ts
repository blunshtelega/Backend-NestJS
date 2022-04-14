import {
  Body,
  Controller,
  Post,
  BadRequestException,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpCode,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesEntity } from './companies.entity';
import { UpdateResult } from 'typeorm';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CreateCompanyDto } from './dto/create-company.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('companies')
@ApiTags('Компании')
@UseInterceptors(ClassSerializerInterceptor)
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}
  // DONE
  @ApiOperation({
    description: 'Создание компании',
  })
  @HttpCode(200)
  @Post('create')
  public async createCompany(
    @Body() companyData: CreateCompanyDto,
  ): Promise<CompaniesEntity | BadRequestException> {
    return await this.companiesService.createCompany(companyData);
  }
  // DONE
  @ApiOperation({
    description: 'Найти все компании',
  })
  @HttpCode(200)
  @Post('find-all')
  public async findAllCompanies(): Promise<
    CompaniesEntity | CompaniesEntity[] | [] | BadRequestException
  > {
    return await this.companiesService.findAllCompanies();
  }
  // DONE
  @ApiOperation({
    description: 'Обновить компанию',
  })
  @HttpCode(200)
  @Post('update')
  public async updateCompany(
    @Body() managerData: UpdateCompanyDto,
  ): Promise<UpdateResult | BadRequestException> {
    return await this.companiesService.updateCompany(managerData);
  }
  // DONE
  @ApiOperation({
    description: 'Найти компанию и связанных пользователей',
  })
  @HttpCode(200)
  @Post('find-one-with-users')
  public async getCompanyAndHisUsers(
    @Body() taxpayerIdentificationNumber: string,
  ): Promise<CompaniesEntity | BadRequestException> {
    return await this.companiesService.getCompanyByTaxpayerNumWithAllUsers(
      taxpayerIdentificationNumber,
    );
  }
  // DONE
  @ApiOperation({
    description: 'Удалить компанию',
  })
  @HttpCode(200)
  @Post('delete')
  public async deleteCompany(
    @Body() taxpayerIdentificationNumber: string,
  ): Promise<string | BadRequestException> {
    await this.companiesService.deleteCompany(taxpayerIdentificationNumber);
    return 'Компания была удалена';
  }
}
