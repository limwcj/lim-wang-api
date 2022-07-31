import { plainToClass as ptc } from 'class-transformer';
import { validateSync } from 'class-validator';

export type Constructor<T = {}> = new (...args: any[]) => T;

export function plainToClassWithValidate<T, V>(classType: Constructor<T>, data: V): T {
  const c = ptc(classType, data);
  const errors = validateSync(c, { forbidUnknownValues: true });
  if (errors.length > 0) throw new Error(JSON.stringify(errors.map((e) => e.toString())));
  return c;
}

export function randomString(len: number, alphabet?: string): string {
  if (!(len > 0)) throw new Error('RandomString error: invalid length');
  // removed the easily confused characters oOLl, 9gq, VV, UU, I1
  const ALPHABET = 'abcdefhijkmnprstwxyzABCDEFGHJKMNPQRSTWXYZ2345678';
  alphabet = alphabet || ALPHABET;
  let s = '';
  for (let i = 0; i < len; i++) {
    s += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }
  return s;
}

export function randomNumber(len: number, alphabet?: string): string {
  if (!(len > 0)) throw new Error('RandomNumber error: invalid length');
  // removed the easily confused characters oOLl, 9gq, VV, UU, I1
  const ALPHABET = '0123456789';
  alphabet = alphabet || ALPHABET;
  let s = '';
  for (let i = 0; i < len; i++) {
    s += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }
  return s;
}
