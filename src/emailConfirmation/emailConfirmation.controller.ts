import {
  Controller,
  ClassSerializerInterceptor,
  UseInterceptors,
  Post,
  Req,
  Body,
  HttpCode,
} from '@nestjs/common';
import { ConfirmEmailDto } from './dto/confirmEmail.dto';
import { EmailConfirmationService } from './emailConfirmation.service';
import { IRequestWithUser } from '../authentication/interfaces/requestWithUser.interface';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('email-confirmation')
@ApiTags('Подтверждение почты')
@UseInterceptors(ClassSerializerInterceptor)
export class EmailConfirmationController {
  constructor(
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {}
  // DONE
  @ApiOperation({
    description: 'Подтверждение почты по ссылке',
  })
  @HttpCode(200)
  @Post('confirm')
  // @Render('email/confirm')
  public async confirm(
    @Body() confirmationData: ConfirmEmailDto,
  ): Promise<void> {
    const email = await this.emailConfirmationService.decodeConfirmationToken(
      confirmationData.token,
    );
    await this.emailConfirmationService.confirmEmail(email);
  }
  // DONE
  @ApiOperation({
    description: 'Выслать повторно ссылку для подтверждения',
  })
  @HttpCode(200)
  @Post('resend-confirmation-link')
  public async resendConfirmationLink(
    @Req() request: IRequestWithUser,
  ): Promise<void> {
    await this.emailConfirmationService.resendConfirmationLink(request.user.id);
  }
}
