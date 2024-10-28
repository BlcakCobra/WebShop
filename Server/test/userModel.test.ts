import User from '../models/user';
import connectDB from '../db'; 
import { closeDB } from '../db'; 

describe('User Model', () => {
  beforeAll(async () => {
    await connectDB(); 
  });

  afterAll(async () => {
    await closeDB(); 
  });

  it('should create a user with valid fields', async () => {
    const user = new User({ username: 'testuser', password: 'hashedPassword123' });
    const savedUser = await user.save(); 

    expect(savedUser._id).toBeDefined();
    expect(savedUser.username).toBe('testuser');
  });

  it('should not create user with missing fields', async () => {
    const user = new User({ username: 'testuser' }); 
    let error;

    try {
      await user.save();
    } catch (err: any) {
      error = err; 
    }

    expect(error).toBeDefined();
    expect(error.errors.password).toBeDefined();
  });
});
