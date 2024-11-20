import { v4 } from "uuid";
import { ImageUploader } from "../Common/ImageUploader/ImageUploader";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../Config";
import { Create_New_User } from "../Auth/Register/Register";

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
    password,
    isSignedIn,
    userId,
    title,
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
    this.password = password;
    this.isSignedIn = isSignedIn;
    this.userId = userId;
    this.title = title;
  }
  async onAdd() {
    try {
      const UserID = {
        value: this.userId,
      };
      if (!this.isSignedIn) {
        const User_Register_Init = new Create_New_User({
          username: this.username,
          email: this.email,
          phoneNumber: this.phoneNumber,
          locationAddress: this.RugCollectionAddress,
          locationPostCode: this.RugCollectionAddressPostCode,
          password: this.password,
          title: this.title,
        });
        const req = await User_Register_Init.onCreate();
        UserID.value = req;
      }

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
        createdAt: serverTimestamp(),
        userId: UserID.value,
        title: this.title,
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
  async onUpdate(orderId) {
    try {
      const RugsUploaded = await Promise.all(
        this.RugsUploaded.map(async (RugUploaded) => {
          const RugImages = RugUploaded.value.RugCleaningOption.RugImages;
          if (RugImages.length >= 1 && RugImages instanceof Array) {
            const RugImagesLinks = await ImageUploader({
              path: "RugsImages",
              files: RugImages.map((image) => image.value),
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
        isUpdated: true,
        updatedAt: serverTimestamp(),
      };

      if (this.RugReturnAddress && this.RugReturnAddressPostCode) {
        Data.RugReturnAddress = this.RugReturnAddress;
        Data.RugReturnAddressPostCode = this.RugReturnAddressPostCode;
      }

      // Update the main order document
      const OrderDocRef = doc(db, "Orders", orderId);
      await updateDoc(OrderDocRef, Data);

      // Update the RugsUploaded sub-collection
      const RugsUploadedCollection = collection(
        db,
        `Orders/${orderId}/RugsUploaded`
      );

      // Delete existing RugsUploaded documents before adding new ones
      const existingRugs = await getDocs(RugsUploadedCollection);
      for (let rugDoc of existingRugs.docs) {
        await deleteDoc(rugDoc.ref);
      }

      // Add updated RugsUploaded documents
      for (let RugUploaded of RugsUploaded) {
        await addDoc(RugsUploadedCollection, RugUploaded);
      }
    } catch (err) {
      throw new Error(err.code || err.message);
    }
  }

  async onRemove() {}
}
