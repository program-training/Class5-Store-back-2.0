import Joi from "joi";
import ShippingDetailsInterface from "../../interfaces/ShippingDetailsInterface";

const shippingDetailsSchema = Joi.object<ShippingDetailsInterface>({
  address: Joi.string().required(),
  contactNumber: Joi.string().required(),
  userId: Joi.string().required(),
  registerOrderType: Joi.string()
    .valid("STANDARD", "EXPRESS", "PICKUP")
    .required(),
});

export default shippingDetailsSchema;
