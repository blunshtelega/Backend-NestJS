import {
  FileNameAndPathCallback,
  FileFilterCallback,
} from './../types/fileLoader.types';
import { IFileFormatForDownload } from '../interfaces/fileFormatForDownload.interface';
import { HttpException, HttpStatus } from '@nestjs/common';
import { IncomingMessage } from 'http';

const publicPath = './public';
let path: string = publicPath;

export class HelperFileLoader {
  path!: string;
  static set path(_path: string) {
    path = publicPath + _path;
  }

  public static customFileName(
    _req: IncomingMessage,
    file: IFileFormatForDownload,
    cb: FileNameAndPathCallback,
  ): void {
    const originalName = file.originalname.split('.');
    const fileExtension = originalName[originalName.length - 1];
    const dateAsPartForName = new Date();
    const splitDateForName = dateAsPartForName
      .toISOString()
      .slice(0, 19)
      .replace(/-|:/g, '');
    cb(null, `${splitDateForName}.${fileExtension}`);
  }

  public static destinationPath(
    _req: IncomingMessage,
    _file: IFileFormatForDownload,
    cb: FileNameAndPathCallback,
  ): void {
    cb(null, path);
  }

  public static fileFilterPrices(
    _req: IncomingMessage,
    file: IFileFormatForDownload,
    cb: FileFilterCallback,
  ): void {
    if (!file.originalname.match(/\.(xlsx|xls)$/)) {
      const error = new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Вы пытаетесь загрузить неверный формат',
        },
        HttpStatus.BAD_REQUEST,
      );
      return cb(error, false);
    }
    cb(null, true);
  }
}
