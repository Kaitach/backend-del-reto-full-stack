import { ExecutionContext } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { SecretGuard } from './user.guard';

describe('SecretGuard', () => {
  let guard: SecretGuard;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [SecretGuard],
    }).compile();
    guard = moduleRef.get<SecretGuard>(SecretGuard);
  });

  describe('canActivate', () => {
    it('should return true when the password is correct', () => {
      const req = {
        body: {
          contraseña: 'abretesesamo',
        },
      };
      const context = {
        switchToHttp: () => ({ getRequest: () => req }),
      } as ExecutionContext;
      expect(guard.canActivate(context)).toBe(true);
    });

    it('should return false when the password is incorrect', () => {
      const req = {
        body: {
          contraseña: 'invalid_password',
        },
      };
      const context = {
        switchToHttp: () => ({ getRequest: () => req }),
      } as ExecutionContext;
      expect(guard.canActivate(context)).toBe(false);
    });

    it('should return false when the password is not provided', () => {
      const req = {
        body: {},
      };
      const context = {
        switchToHttp: () => ({ getRequest: () => req }),
      } as ExecutionContext;
      expect(guard.canActivate(context)).toBe(false);
    });
  });
});
