import { Logger } from 'pino';
import { HandlerResponse } from '@local/interfaces/networking/endpoint-handler';
import { HttpResponseCode } from '@local/express/http/http-response-code';

export class UserHandler {
  public constructor(private readonly logger: Logger) {}

  public handleGet(id: string): Promise<HandlerResponse<any>> {
    this.logger.info({ id }, 'Handling GET request...');

    return Promise.resolve({ code: HttpResponseCode.OK, payload: {} });
  }
}
