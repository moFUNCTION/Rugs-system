import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../Config";
import { v4 } from "uuid";
export const ImageUploader = async ({ path, files }) => {
  try {
    const imageUploading = files.map(async (file) => {
      const filePath = `${path}/${file.name + v4()}`;
      const fileRef = ref(storage, filePath);
      await uploadBytes(fileRef, file);
      const URL = await getDownloadURL(fileRef);
      return {
        URL,
        filePath,
      };
    });
    return await Promise.all(imageUploading);
  } catch (err) {
    throw new Error(err.message);
  }
};
