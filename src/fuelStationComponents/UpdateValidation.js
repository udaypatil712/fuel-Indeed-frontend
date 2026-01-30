export function validateStep1(data) {
  if (
    !data.stationName ||
    !data.contact ||
    !data.city ||
    !data.area ||
    !data.pincode ||
    !data.address
  ) {
    return { ok: false, msg: "All basic fields are required" };
  }
  if (data.contact.length < 10)
    return { ok: false, msg: "Invalid contact number" };
  if (String(data.pincode).length !== 6)
    return { ok: false, msg: "Invalid pincode" };
  return { ok: true, msg: "" };
}

export function validateStep2(data) {
  if (!data.openTime || !data.closeTime) {
    return { ok: false, msg: "Timing fields are required" };
  }
  return { ok: true, msg: "" };
}

export function validateStep3(data) {
  if (
    !data.petrolQty ||
    !data.petrolRate ||
    !data.dieselQty ||
    !data.dieselRate
  ) {
    return { ok: false, msg: "All fuel fields are required" };
  }
  return { ok: true, msg: "" };
}
