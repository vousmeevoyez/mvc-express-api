import Multer from "multer";

// eslint-disable-next-line new-cap
const Storage = new Multer.memoryStorage();
const upload = Multer({
  storage: Storage,
});

export default upload;
