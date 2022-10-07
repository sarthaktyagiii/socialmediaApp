import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existinguser = await User.findOne({ email });
    if (!existinguser)
      return res.status(404).json({ message: 'user dont exist' });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existinguser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: 'Invalid credentials.' });

    const token = jwt.sign(
      { email: existinguser.email, id: existinguser._id },
      'test',
      { expiresIn: '7d' }
    );
    res.status(200).json({ result: existinguser, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
export const signup = async (req, res) => {
  const { firstName, lastName, confirmPassord, email, password } = req.body;

  try {
    const existinguser = await User.findOne({ email });
    if (existinguser)
      return res.status(400).json({ message: 'user already exists' });
    // if (password != confirmPassord) {
    //   res.status(400).json({ message: 'Passwords are not matching' });
    // }
    const hashedPassoword = await bcrypt.hash(password, 12);
    const result = await User.create({
      email,
      password: hashedPassoword,
      name: `${firstName} ${lastName}`,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, 'test', {
      expiresIn: '1h',
    });
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: 'something went wrong' });
  }
};
