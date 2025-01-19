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
  where,
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
    affiliate,
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
    this.affiliate = affiliate;
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
      const Data = {
        username: this.firstName + this.lastName,
        firstName: this.firstName + this.lastName,
        email: this.email,
        phoneNumber: this.phoneNumber,
        RugCollectionAddress: this.RugCollectionAddress,
        RugCollectionAddressPostCode: this.RugCollectionAddressPostCode,
        status: "request",
        createdAt: serverTimestamp(),
        userId: UserID.value,
        title: this.title,
        isArchived: false,
      };
      if (this.affiliate) {
        Data.affiliate = this.affiliate;
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
            console.log(RugImagesLinks);
            Data.OrderImages = RugImagesLinks;
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
      // Start batch write
      const batch = writeBatch(db);

      if (this.RugsUploaded?.length >= 1) {
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
        const existingRugsSnapshot = await getDocs(
          collection(db, `Orders/${orderId}/RugsUploaded`)
        );
        existingRugsSnapshot.forEach((doc) => {
          batch.delete(doc.ref);
        });

        const rugsCollection = collection(db, `Orders/${orderId}/RugsUploaded`);
        RugsUploaded.forEach((rug) => {
          const newRugRef = doc(rugsCollection);
          batch.set(newRugRef, rug);
        });
      }

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

      // Update main order document
      const orderRef = doc(db, "Orders", orderId);
      batch.update(orderRef, orderData);

      // Commit all changes
      await batch.commit();

      return {
        success: true,
        orderId,
      };
    } catch (error) {
      console.error("Error updating order:", error);
      throw new Error(`Failed to update order: ${error.message}`);
    }
  }
  async onConfirmByClient({
    orderId,
    collectionDate2,
    collectionDate,
    billingAddress,
    InvoiceRef,
    isThereDifferentBillingAddress,
    isThereInvoiceRef,
  }) {
    const OrdersCollection = collection(db, "Orders");
    const LastDocumentQuery = query(
      OrdersCollection,
      limit(1),
      orderBy("createdAt", "desc"),
      where("status", "==", "order")
    );

    const LastDoc = await getDocs(LastDocumentQuery);

    const Data = {
      isAcceptedByClient: true,
      collectionDate2,
      collectionDate,
      receiptNo: 1,
      SelectedDateOfRecievingOrder: null,
    };

    if (!LastDoc.empty) {
      Data.receiptNo =
        orderId === LastDoc.docs[0].id
          ? isNaN(LastDoc.docs[0].data().receiptNo)
            ? 1
            : LastDoc.docs[0].data().receiptNo
          : LastDoc.docs[0].data().receiptNo + 1;
    }

    if (isThereDifferentBillingAddress && billingAddress.fullName) {
      Data.billingAddress = billingAddress;
    }
    if (isThereInvoiceRef && InvoiceRef.name) {
      Data.InvoiceRef = InvoiceRef;
    }
    await this.onUpdate(orderId, Data);
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
