import localforage from "localforage";

// Configure localForage instance
localforage.config({
  name: "MyApp",
  storeName: "imagesStore",
});

export const saveImage = async (key, imageFile) => {
  try {
    await localforage.setItem(key, imageFile);

    return {
      key,
    };
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
