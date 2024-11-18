import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../Config";

export class SignUser {
  constructor({ password, email }) {
    this.email = email;
    this.password = password;
  }
  async onSign() {
    const req = await signInWithEmailAndPassword(
      auth,
      this.email,
      this.password
    );
  }
}
