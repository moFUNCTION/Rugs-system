import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { ImageUploader } from "../Common/ImageUploader/ImageUploader";
import { db } from "../../Config";

export class Invoice {
  constructor({
    customerName,
    customerEmail,
    userId,
    orderId,
    InvoiceFile,
    isPaid = "No",
    asReceipt,
  } = {}) {
    this.customerName = customerName;
    this.customerEmail = customerEmail;
    this.userId = userId;
    this.orderId = orderId;
    this.InvoiceFile = InvoiceFile;
    this.isPaid = isPaid;
  }

  async AddInvoice() {
    const Data = {
      customerName: this.customerName,
      customerEmail: this.customerEmail,
      userId: this.userId,
      orderId: this.orderId,
      createdAt: serverTimestamp(),
      isPaid: this.isPaid,
    };
    if (this.InvoiceFile) {
      const file = new File([this.InvoiceFile], "filename.ext", {
        type: this.InvoiceFile.type,
      });
      const [InvoiceFile] = await ImageUploader({
        path: "Invoices",
        files: [file],
      });
      Data.InvoiceFile = InvoiceFile;
    }
    const InvoicesCollection = collection(db, "Invoices");
    const LastDocumentQuery = query(
      InvoicesCollection,
      limit(1),
      orderBy("createdAt", "desc")
    );

    const LastDoc = await getDocs(LastDocumentQuery);
    const InvoiceDoc = doc(db, "Invoices", this.orderId);
    if (!LastDoc.empty) {
      await setDoc(InvoiceDoc, {
        count:
          this.orderId === LastDoc.docs[0].data().orderId
            ? LastDoc.docs[0].data().count
            : LastDoc.docs[0].data().count + 1,
        ...Data,
      });
    } else {
      await setDoc(InvoiceDoc, {
        ...Data,
        count: 1,
      });
    }
  }
}
