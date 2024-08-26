import User from "../models/userModel.mjs";
import authSchema from "../schemas/authSchema.mjs";

// Membuat pengguna baru
const login = async (req, res) => {
  let validationResult;
  try {
    validationResult = authSchema.validate(req.body);
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
    return res.status(200).json(user);
  } catch (err) {
    const { message } = err;
    return res.status(422).json({ error: message });
  }
};

export default login;
