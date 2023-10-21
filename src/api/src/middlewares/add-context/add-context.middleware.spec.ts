import { AddContextMiddleware } from './add-context.middleware';
import * as httpContext from 'express-http-context';
import * as mocksHttp from 'node-mocks-http';

describe('A AddContext middleware', () => {
  const middleware = new AddContextMiddleware();

  it('should add a contextId to the request', () => {
    const request = mocksHttp.createRequest();
    const response = mocksHttp.createResponse();
    jest.spyOn(response, 'setHeader');
    jest.spyOn(httpContext, 'set');
    const next = jest.fn();

    middleware.use(request, response, next);

    expect(httpContext.set).toHaveBeenCalledWith('X-Context-Id', expect.any(String));
    expect(response.setHeader).toHaveBeenCalledWith('X-Context-Id', expect.any(String));
    expect(response.setHeader).toHaveBeenCalledWith('X-Response-Date', expect.any(String));
    expect(next).toHaveBeenCalled();
  });
});
