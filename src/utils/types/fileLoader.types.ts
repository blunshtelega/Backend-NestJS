import { HttpException } from '@nestjs/common';

export type FileFilterCallback = (
  message: null | HttpException,
  second: boolean,
) => void;
export type FileNameAndPathCallback = (first: null, second: string) => void;
