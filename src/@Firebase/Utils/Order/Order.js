import { v4 } from "uuid";
import { ImageUploader } from "../Common/ImageUploader/ImageUploader";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../Config";
import { Create_New_User } from "../Auth/Register/Register";

export class Order {
  constructor({
    firstName,
    lastName,
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
    status = "pending",
  } = {}) {
    this.firstName = firstName;
    this.lastName = lastName;
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
    this.status = status;
  }
  #getAllParams() {
    return { ...this };
  }
  async onAdd() {
    try {
      const UserID = {
        value: this.userId,
      };
      if (!this.isSignedIn) {
        const User_Register_Init = new Create_New_User({
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.firstName + " " + this.lastName,
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
          return RugUploaded.value;
        })
      );
      const {
        docs: [lastDoc],
      } = await getDocs(
        query(collection(db, "Orders"), limit(1), orderBy("createdAt", "desc"))
      );

      const Data = {
        username: this.firstName + this.lastName,
        firstName: this.firstName + this.lastName,
        email: this.email,
        phoneNumber: this.phoneNumber,
        RugCollectionAddress: this.RugCollectionAddress,
        RugCollectionAddressPostCode: this.RugCollectionAddressPostCode,
        status: "pending",
        createdAt: serverTimestamp(),
        userId: UserID.value,
        title: this.title,
        uniqueId: (lastDoc?.data()?.uniqueId || 0) + 1,
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
  async onUpdate(orderId, RestParams) {
    try {
      if (this.RugsUploaded?.length >= 1) {
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
        const RugsUploadedCollection = collection(
          db,
          `Orders/${orderId}/RugsUploaded`
        );
        const existingRugs = await getDocs(RugsUploadedCollection);
        for (let rugDoc of existingRugs.docs) {
          await deleteDoc(rugDoc.ref);
        }

        for (let RugUploaded of RugsUploaded) {
          await addDoc(RugsUploadedCollection, RugUploaded);
        }
      }

      const Data = {
        status: this.status,
        isUpdated: true,
        updatedAt: serverTimestamp(),
        ...RestParams,
      };

      const Params = this.#getAllParams();
      for (let item in Params) {
        if (Params[item] && item !== "RugsUploaded") {
          Data[item] = Params[item];
        }
      }

      if (this.RugReturnAddress && this.RugReturnAddressPostCode) {
        Data.RugReturnAddress = this.RugReturnAddress;
        Data.RugReturnAddressPostCode = this.RugReturnAddressPostCode;
      }

      // Update the main order document
      const OrderDocRef = doc(db, "Orders", orderId);
      await updateDoc(OrderDocRef, Data);
    } catch (err) {
      throw new Error(err.code || err.message);
    }
  }
  async onConfirmByClient({ orderId, returnDate, collectionDate }) {
    await this.onUpdate(orderId, {
      isAcceptedByClient: true,
      returnDate,
      collectionDate,
    });
  }

  async onRemove() {}
}
