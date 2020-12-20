import { InjectionToken } from '@angular/core';

export const Environment = new InjectionToken<string>('environment');

export interface EnvironmentDescriptor {
  name: string;
  production: boolean;
  useFakeAuthenticationProvider: boolean;
}
