import User from "../models/userModel.mjs";
import {
  loginSchema,
  resetPasswordSchema,
  validateResetPasswordSchema,
} from "../schemas/authSchema.mjs";
import { generateJWT, decodeJwt } from "../lib/jwt.mjs";
import { sendResetPasswordEmail } from "../lib/email.mjs";

// Membuat pengguna baru
export const login = async (req, res) => {
  let validationResult;
  try {
    validationResult = loginSchema.validate(req.body);
  } catch (err) {
    const { message } = err;
    return res.status(400).json({ error: message });
  }

  const { error, value } = validationResult;
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const user = await User.getByEmailPassword(value);
    const auth = generateJWT({ user });
    return res.status(200).json(auth);
  } catch (err) {
    const { message } = err;
    return res.status(422).json({ error: message });
  }
};

export const resetPassword = async (req, res) => {
  let validationResult;
  try {
    validationResult = resetPasswordSchema.validate(req.body);
  } catch (err) {
    const { message } = err;
    return res.status(400).json({ error: message });
  }

  const { error, value } = validationResult;
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const user = await User.getByEmailPassword(value);

    const { token: resetToken } = generateJWT({
      user,
      expiresIn: "10m",
    });
    const { email: to } = user;
    await sendResetPasswordEmail({ to, resetToken });

    return res.status(200).json({ message: "reset password sent success" });
  } catch (err) {
    const { message } = err;
    return res.status(422).json({ error: message });
  }
};

export const validateResetPassword = async (req, res) => {
  let validationResult;
  try {
    validationResult = validateResetPasswordSchema.validate(req.body);
  } catch (err) {
    const { message } = err;
    return res.status(400).json({ error: message });
  }

  const { error, value } = validationResult;
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { token, password } = value;
  let id;
  try {
    const { sub } = decodeJwt({ token });
    id = sub;
  } catch (err) {
    return res.status(422).json({ error: err });
  }

  const user = await User.getById(id);
  if (!user) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { email } = user;
  const userPasswordExist = await User.getByEmailPassword({
    email,
    password,
    raiseError: false,
  });

  if (userPasswordExist) {
    return res.status(400).json({ error: "password is same with the old one" });
  }

  try {
    await User.update(id, { password });
  } catch (err) {
    return res.status(422).json({ error: err });
  }

  return res.status(200).json({ message: "reset password success" });
};
