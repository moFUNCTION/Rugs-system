/**
 * Calculates the total price for an array of rugs
 * @param {Array} rugs - Array of rug objects
 * @returns {number} - Total price rounded to 2 decimal places
 */
export const sumTotalPrice = (rugs) => {
  // Validate input
  if (!Array.isArray(rugs) || rugs.length === 0) {
    return 0;
  }

  // Helper function to safely parse float with fallback
  const safeParseFloat = (value, fallback = 0) => {
    const parsed = parseFloat(value);
    return !isNaN(parsed) ? parsed : fallback;
  };

  // Helper function to calculate conversion factor
  const getConversionFactor = (unit) => {
    switch (unit) {
      case "cms":
        return 0.01;
      case "inches":
        return 0.0254;
      default:
        return 1;
    }
  };

  // Helper function to calculate rug size
  const calculateRugSize = (width, length, unit) => {
    const conversionFactor = getConversionFactor(unit);
    const widthInM = safeParseFloat(width) * conversionFactor;
    const lengthInM = safeParseFloat(length) * conversionFactor;
    return widthInM * lengthInM;
  };

  // Calculate total price
  const totalPrice = rugs.reduce((total, rug) => {
    if (!rug) return total;

    const rugSize = calculateRugSize(rug.width, rug.length, rug.UnitSelector);
    let rugTotal = 0;
    console.log(rugSize);

    // Cleaning Option Pricing
    switch (rug.RugCleaningOption?.name) {
      case "Deep Wash Rug Cleaning and tick one or more Stain Treatments | Repairs or Restoration works | Alteration works":
        if (Array.isArray(rug.RugCleaningOption?.Treatment)) {
          rugTotal += rug.RugCleaningOption.Treatment.reduce(
            (treatmentTotal, treatment) => {
              console.log(treatment.price);
              if (!treatment) return treatmentTotal;

              switch (treatment.value) {
                case "Flood water/mould/damp damage":
                  return (
                    treatmentTotal +
                    safeParseFloat(treatment.price) * rugSize * 2
                  );
                default: {
                  const treatmentPrice = safeParseFloat(treatment.price);
                  return treatmentTotal + treatmentPrice;
                }
              }
            },
            0
          );
        }
        break;

      case "Rug Repairs and Restoration Works ONLY":
      case "Rug Alteration Works ONLY":
        console.log("saas", rugs.RugCleaningOption);
        rugTotal += safeParseFloat(rug.RugCleaningOption?.price);
        break;

      case "General (Deep Wash) Rug Cleaning Works ONLY":
        rugTotal += safeParseFloat(rug.RugCleaningOption?.price) * rugSize;
        break;
    }

    // Additional Services
    if (Array.isArray(rug.AdditionalServices)) {
      rugTotal += rug.AdditionalServices.reduce((serviceTotal, service) => {
        return serviceTotal + safeParseFloat(service?.price) * rugSize;
      }, 0);
    }

    return total + rugTotal;
  }, 0);

  // Round to 2 decimal places
  return parseFloat(totalPrice.toFixed(2));
};
