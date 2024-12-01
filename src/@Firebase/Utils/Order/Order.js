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
  writeBatch,
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
    totalPrice,
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
    this.totalPrice = totalPrice;
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
          phoneNumber: `${this.phoneNumber}`,
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
        invoiceNo: (lastDoc?.data()?.uniqueId || 0) + 1,
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

  async processRugImages(rugData) {
    try {
      const { RugCleaningOption } = rugData;
      const { RugImages = [], RugReceivedImages = [] } = RugCleaningOption;

      const processImages = async (images, path) => {
        if (Array.isArray(images) && images.length > 0) {
          const files = images.map((image) => image?.value).filter(Boolean);

          if (files.length > 0) {
            return await ImageUploader({
              path,
              files,
            });
          }
        }
        return images;
      };

      const [processedRugImages, processedReceivedImages] = await Promise.all([
        processImages(RugImages, "RugsImages"),
        processImages(RugReceivedImages, "RugsImages"),
      ]);

      return {
        ...rugData,
        RugCleaningOption: {
          ...RugCleaningOption,
          RugImages: processedRugImages,
          RugReceivedImages: processedReceivedImages,
        },
      };
    } catch (error) {
      console.error("Error processing rug images:", error);
      throw error;
    }
  }

  async onUpdate(orderId, rest) {
    if (!orderId) {
      throw new Error("Order ID is required");
    }

    try {
      // Process all rugs data
      const RugsUploaded = await Promise.all(
        this.RugsUploaded.map(async (RugUploaded) => {
          const Data = {
            ...RugUploaded.value,
            id: RugUploaded.id || v4(),
            updatedAt: serverTimestamp(),
          };
          return await this.processRugImages(Data);
        })
      );

      const orderData = {
        status: this.status,
        isUpdated: true,
        updatedAt: serverTimestamp(),
        ...rest,
      };

      const Params = this.#getAllParams();
      for (let item in Params) {
        if (Params[item] && item !== "RugsUploaded") {
          orderData[item] = Params[item];
        }
      }

      if (this.RugReturnAddress && this.RugReturnAddressPostCode) {
        orderData.RugReturnAddress = this.RugReturnAddress;
        orderData.RugReturnAddressPostCode = this.RugReturnAddressPostCode;
      }

      // Start batch write
      const batch = writeBatch(db);

      // Update main order document
      const orderRef = doc(db, "Orders", orderId);
      batch.update(orderRef, orderData);

      // Delete existing rugs
      const existingRugsSnapshot = await getDocs(
        collection(db, `Orders/${orderId}/RugsUploaded`)
      );
      existingRugsSnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });

      // Add new rugs
      const rugsCollection = collection(db, `Orders/${orderId}/RugsUploaded`);
      RugsUploaded.forEach((rug) => {
        const newRugRef = doc(rugsCollection);
        batch.set(newRugRef, rug);
      });

      // Commit all changes
      await batch.commit();

      return {
        success: true,
        orderId,
        rugsCount: RugsUploaded.length,
      };
    } catch (error) {
      console.error("Error updating order:", error);
      throw new Error(`Failed to update order: ${error.message}`);
    }
  }
  async onConfirmByClient({ orderId, returnDate, collectionDate }) {
    await this.onUpdate(orderId, {
      isAcceptedByClient: true,
      returnDate,
      collectionDate,
    });
  }
  async onRemove(orderId) {
    if (!orderId) {
      throw new Error("Order ID is required");
    }

    try {
      const batch = writeBatch(db);

      // Delete all rugs
      const rugsSnapshot = await getDocs(
        collection(db, `Orders/${orderId}/RugsUploaded`)
      );
      rugsSnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });

      // Delete main order document
      batch.delete(doc(db, "Orders", orderId));

      await batch.commit();

      return {
        success: true,
        orderId,
      };
    } catch (error) {
      console.error("Error removing order:", error);
      throw new Error(`Failed to remove order: ${error.message}`);
    }
  }
}
