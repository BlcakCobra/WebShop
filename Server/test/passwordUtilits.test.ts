import { hashPassword } from '../utilits/PasswordUtilits';
import bcrypt from 'bcrypt';

describe('Password Utility Functions', () => {
  it('should hash password correctly', async () => {
    const password = 'Test1234';
    const hashedPassword = await hashPassword(password);
    expect(await bcrypt.compare(password, hashedPassword)).toBe(true);
  });

  it('should throw an error when password is empty', async () => {
    await expect(hashPassword('')).rejects.toThrow('Password cannot be empty');
  });

  it('should throw an error when password is not a string', async () => {
    await expect(hashPassword(1234 as any)).rejects.toThrow('Password must be a string');
  });
});
