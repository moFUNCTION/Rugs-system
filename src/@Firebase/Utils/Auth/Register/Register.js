import { addDoc, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../../../Config";
import { createUserWithEmailAndPassword } from "firebase/auth";
export class Create_New_User {
  constructor({
    firstName,
    lastName,
    email,
    phoneNumber,
    locationPostCode,
    locationAddress,
    password,
    title = "MR",
  }) {
    this.title = title;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.locationAddress = locationAddress;
    this.locationPostCode = locationPostCode;
    this.password = password;
  }
  async #onSaveInFirestore({ userID }) {
    const userDoc = doc(db, "Users", userID);
    await setDoc(userDoc, {
      title: this.title,
      firstName: this.firstName,
      lastName: this.lastName,
      username: this.firstName + this.lastName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      locationAddress: this.locationAddress,
      locationPostCode: this.locationPostCode,
      createdAt: serverTimestamp(),
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
      return req.user.uid;
    } catch (err) {
      console.log(err);
      throw new Error(err.code);
    }
  }
}
