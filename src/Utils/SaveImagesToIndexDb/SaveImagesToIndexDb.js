import localforage from "localforage";

// Configure localForage instance
localforage.config({
  name: "MyApp",
  storeName: "imagesStore",
});

export const saveImage = async (key, imageFile) => {
  try {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onload = async (event) => {
        try {
          const imageData = event.target.result;
          await localforage.setItem(key, imageData);
          resolve({
            key,
          });
        } catch (err) {
          reject(err);
        }
      };

      reader.onerror = () => reject(reader.error);

      reader.readAsDataURL(imageFile);
    });
  } catch (err) {
    console.error("Error saving image:", err);
    throw err;
  }
};

// Retrieve image
export const getImage = async (key) => {
  try {
    const imageData = await localforage.getItem(key);
    return imageData; // Returns Data URL or Blob
  } catch (err) {
    console.error("Error retrieving image:", err);
    throw err;
  }
};

// Remove image
export const removeImage = async (key) => {
  try {
    await localforage.removeItem(key);
    console.log("Image removed successfully.");
  } catch (err) {
    console.error("Error removing image:", err);
    throw err;
  }
};
