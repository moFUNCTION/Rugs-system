import { addDoc, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../Config";
import { createUserWithEmailAndPassword } from "firebase/auth";
export class Create_New_User {
  constructor({
    username,
    email,
    phoneNumber,
    locationPostCode,
    locationAddress,
    password,
  }) {
    this.username = username;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.locationAddress = locationAddress;
    this.locationPostCode = locationPostCode;
    this.password = password;
  }
  async #onSaveInFirestore({ userID }) {
    const userDoc = doc(db, "Users", userID);
    await setDoc(userDoc, {
      username: this.username,
      email: this.email,
      phoneNumber: this.phoneNumber,
      locationAddress: this.locationAddress,
      locationPostCode: this.locationPostCode,
    });
  }
  async onCreate() {
    try {
      const req = await createUserWithEmailAndPassword(
        auth,
        this.email,
        this.password
      );
      await this.#onSaveInFirestore({ userID: req.user.uid });
    } catch (err) {
      throw new Error(err.code);
    }
  }
}
