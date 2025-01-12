import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

//register logic
export const registerUser = async (req: any, res: any) => {
  const { username, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: 'User already exists' });

  const user = new User({ username, email, password }); // ไม่ต้องแฮชรหัสตรงนี้
  await user.save();

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

  res.status(201).json({ user, token });
};


//login logic
export const loginUser = async (req: any, res: any) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
  
    const match = await bcrypt.compare(password, user.password);
    console.log('Password match status:', match);
    console.log('Password to compare:', password);
    console.log('Hashed password in DB:', user.password);
    
    if (!match) return res.status(400).json({ message: 'Invalid password' });
  
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
  
    res.status(200).json({ user, token });
    
   

  };
