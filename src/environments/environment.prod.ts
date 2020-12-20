import { EnvironmentDescriptor } from './../app/@core/infra/shared/types/environment';

export const environment: EnvironmentDescriptor = {
  name: 'prod',
  production: true,
  useFakeAuthenticationProvider: false,
};
