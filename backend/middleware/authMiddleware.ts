import jwt from 'jsonwebtoken';

export const authMiddleware = (req: any, res: any, next: any) => {
  const token = req.headers['authorization'];

  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET as string, (err:any , decoded:any ) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });

    req.userId = decoded.userId;
    next();
  });
};
