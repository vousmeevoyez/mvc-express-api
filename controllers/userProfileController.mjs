import UserProfile from "../models/userProfileModel.mjs";
import userProfileSchema from "../schemas/userProfileSchema.mjs";
import upload from "../lib/uploader.mjs";

const DECIMAL = 10;

// Membuat pengguna baru
// eslint-disable-next-line import/prefer-default-export
export const createUserProfile = async (req, res) => {
  const { error, value } = userProfileSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // sesuaikan dengan nama kolom tabel
  const userId = parseInt(req.params.id, DECIMAL);

  // file upload ke cloudinary
  const b64 = Buffer.from(req.file.buffer).toString("base64");
  const dataURI = `data:${req.file.mimetype};base64,${b64}`;
  const { url: image } = await upload(dataURI);

  try {
    const profile = await UserProfile.create({
      user_id: userId,
      image,
      ...value,
    });
    return res.status(201).json(profile);
  } catch (err) {
    const { detail } = err;
    console.error(err);
    return res.status(422).json({ error: detail });
  }
};
