import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 2, maxlength: 80 },
  phone: { type: String, required: true, trim: true, minlength: 8, maxlength: 18 },
  appliance: { type: String, required: true, enum: ['Air conditioner', 'Refrigerator', 'Washing machine', 'Other appliance'] },
  issue: { type: String, required: true, trim: true, minlength: 5, maxlength: 1200 },
  area: { type: String, required: true, trim: true, maxlength: 120 },
  preferredTime: { type: String, required: true, trim: true, maxlength: 120 },
  status: { type: String, enum: ['new', 'contacted', 'scheduled', 'closed'], default: 'new' }
}, { timestamps: true, versionKey: false });

export const Booking = mongoose.model('Booking', bookingSchema);
