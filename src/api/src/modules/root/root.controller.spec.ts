import { RootController } from './root.controller';
import { RootService } from './root.service';

describe('A Root Controller', () => {
  const rootService = new RootService();
  const controller = new RootController(rootService);

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(controller.getHello()).toBe('Hello World!');
    });
  });
});
