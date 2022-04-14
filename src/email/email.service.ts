import { Injectable, BadRequestException } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import * as Mail from 'nodemailer/lib/mailer';

@Injectable()
export class EmailService {
  private nodemailerTransport: Mail;

  constructor(private readonly configService: ConfigService) {
    this.nodemailerTransport = createTransport({
      service: this.configService.get('EMAIL_SERVICE'),
      auth: {
        user: this.configService.get('EMAIL_USER'),
        pass: this.configService.get('EMAIL_PASSWORD'),
      },
    });
  }
  // DONE (убрал изначальный return)
  public async sendMail(options: Mail.Options): Promise<void> {
    try {
      await this.nodemailerTransport.sendMail(options);
    } catch (error) {
      throw new BadRequestException('Что-то пошло не так (sendMail)');
    }
  }
}
