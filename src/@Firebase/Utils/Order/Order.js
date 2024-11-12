import { v4 } from "uuid";
import { ImageUploader } from "../Common/ImageUploader/ImageUploader";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../Config";

export class Order {
  constructor({
    username,
    email,
    phoneNumber,
    RugCollectionAddress,
    RugReturnAddress,
    RugCollectionAddressPostCode,
    RugReturnAddressPostCode,
    RugsUploaded,
  } = {}) {
    this.username = username;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.RugCollectionAddress = RugCollectionAddress;
    this.RugCollectionAddress = RugCollectionAddress;
    this.RugCollectionAddressPostCode = RugCollectionAddressPostCode;
    this.RugReturnAddress = RugReturnAddress;
    this.RugReturnAddressPostCode = RugReturnAddressPostCode;
    this.RugsUploaded = RugsUploaded;
  }
  async onAdd() {
    try {
      const RugsUploaded = await Promise.all(
        this.RugsUploaded.map(async (RugUploaded) => {
          const RugImages = RugUploaded.value.RugCleaningOption.RugImages;
          if (RugImages.length >= 1 && RugImages instanceof Array) {
            const RugImagesLinks = await ImageUploader({
              path: "RugsImages",
              files: RugImages.map((image) => {
                return image.value;
              }),
            });
            return {
              ...RugUploaded.value,
              RugCleaningOption: {
                ...RugUploaded.value.RugCleaningOption,
                RugImages: RugImagesLinks,
              },
            };
          }
          return RugUploaded;
        })
      );
      const Data = {
        username: this.username,
        email: this.email,
        phoneNumber: this.phoneNumber,
        RugCollectionAddress: this.RugCollectionAddress,
        RugCollectionAddressPostCode: this.RugCollectionAddressPostCode,
        status: "pending",
      };
      if (this.RugReturnAddress && this.RugReturnAddressPostCode) {
        Data.RugReturnAddress = this.RugReturnAddress;
        Data.RugReturnAddressPostCode = this.RugReturnAddressPostCode;
      }
      const AddOrderDocumnet = await addDoc(collection(db, "Orders"), Data);

      const RugsUploadedCollection = collection(
        db,
        `Orders/${AddOrderDocumnet.id}/RugsUploaded`
      );
      for (let RugUploaded of RugsUploaded) {
        await addDoc(RugsUploadedCollection, RugUploaded);
      }
    } catch (Err) {
      throw new Error(Err.message);
    }
  }
}
