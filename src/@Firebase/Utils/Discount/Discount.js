import { Document } from "../Common/Document/Dcoument";
function isDateAfterNow(dateString) {
  const inputDate = new Date(dateString);
  const now = new Date();
  return inputDate > now;
}
export class Discount extends Document {
  constructor() {
    super();
  }
  static async GetDiscount({ id }) {
    try {
      const res = await Document.Get({ __collection__: "Discounts", id });
      if (!isDateAfterNow(res.expireAt)) {
        return {
          isExpired: true,
        };
      }
      return res;
    } catch (err) {
      throw new Error(err.message || err);
    }
  }
}
