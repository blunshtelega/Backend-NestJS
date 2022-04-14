import { Body, Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CompaniesEntity } from './companies.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(CompaniesEntity)
    private readonly companyRepository: Repository<CompaniesEntity>,
  ) {}
  // DONE
  public async createCompany(
    @Body() companyData: CreateCompanyDto,
  ): Promise<CompaniesEntity | BadRequestException> {
    try {
      const newCompany = this.companyRepository.create(companyData);
      await this.companyRepository.save(newCompany);
      return newCompany;
    } catch (e) {
      throw new BadRequestException('Что-то пошло не так (createCompany)');
    }
  }
  // DONE
  public async findAllCompanies(): Promise<
    CompaniesEntity | CompaniesEntity[] | [] | BadRequestException
  > {
    try {
      return await this.companyRepository.find({});
    } catch (e) {
      throw new BadRequestException('Что-то пошло не так (findAllCompanies)');
    }
  }
  // DONE
  // Отрабатывает без блока catch, чтобы не ругался TS и можно было использовать компанию в user.service
  public async findCompanyByTaxpayerNumber(
    taxpayerIdentificationNumber: string,
  ): Promise<any> {
    const _foundCompany = await this.companyRepository.findOne({
      taxpayerIdentificationNumber,
    });
    if (_foundCompany) {
      return _foundCompany;
    }
  }
  // DONE
  // Альтернативная реализация через repository.save в updateManager
  public async updateCompany(
    companyData: UpdateCompanyDto,
  ): Promise<UpdateResult | BadRequestException> {
    const _foundCompany = await this.companyRepository.findOne({
      where: {
        taxpayerIdentificationNumber: companyData.taxpayerIdentificationNumber,
      },
    });
    if (!_foundCompany) {
      throw new BadRequestException('Компании с таким ИНН не существует');
    }
    try {
      companyData.updatedAt = new Date();
      return await this.companyRepository.update(_foundCompany.id, companyData);
    } catch (e) {
      throw new BadRequestException('Что-то пошло не так (updateCompany)');
    }
  }
  // DONE
  public async getCompanyByTaxpayerNumWithAllUsers(
    taxpayerIdentificationNumber: string,
  ): Promise<CompaniesEntity | BadRequestException> {
    const _foundCompany = await this.companyRepository.findOne(
      taxpayerIdentificationNumber,
      { relations: ['users'] },
    );
    if (!_foundCompany) {
      throw new BadRequestException('Компании с таким ИНН не существует');
    }
    try {
      return _foundCompany;
    } catch (e) {
      throw new BadRequestException(
        'Что-то пошло не так (getCompanyByTaxpayerNumWithAllUsers)',
      );
    }
  }
  // DONE
  public async deleteCompany(
    taxpayerIdentificationNumber: string,
  ): Promise<void | BadRequestException> {
    const _foundCompany = await this.companyRepository.findOne(
      taxpayerIdentificationNumber,
    );
    if (!_foundCompany) {
      throw new BadRequestException('Компании с таким ИНН не существует');
    }
    try {
      await this.companyRepository.remove(_foundCompany);
    } catch (e) {
      throw new BadRequestException('Что-то пошло не так (deleteCompany)');
    }
  }
}
