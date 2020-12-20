import { BREADCRUMB_SYMBOL } from './types';

export function Breadcrumb() {
  return (target: any, key: string) => {
    Object.defineProperty(target, BREADCRUMB_SYMBOL, {
      value: key,
      enumerable: true,
      writable: false,
      configurable: false,
    });
  };
}
