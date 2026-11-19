import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { Booking } from '../models/booking.model.js';

const router = Router();
const bookingLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 8, standardHeaders: 'draft-8', legacyHeaders: false, message: { message: 'Too many requests. Please call our team instead.' } });
const fields = ['name', 'phone', 'appliance', 'issue', 'area', 'preferredTime'];

router.get('/health', (_req, res) => res.json({ status: 'ok', service: 'pm-electricals-api' }));
router.get('/services', (_req, res) => res.json([
  { id: 'ac', name: 'Air conditioning' },
  { id: 'refrigerator', name: 'Refrigerators' },
  { id: 'washing-machine', name: 'Washing machines' }
]));
router.post('/bookings', bookingLimiter, async (req, res, next) => {
  try {
    const payload = Object.fromEntries(fields.map((field) => [field, typeof req.body?.[field] === 'string' ? req.body[field].trim() : '']));
    const missing = fields.filter((field) => !payload[field]);
    if (missing.length) return res.status(400).json({ message: 'Please complete all required fields.', fields: missing });
    if (payload.name.length < 2 || payload.name.length > 80) return res.status(400).json({ message: 'Please enter a name between 2 and 80 characters.' });
    if (!/^[+0-9() -]{8,18}$/.test(payload.phone)) return res.status(400).json({ message: 'Please enter a valid phone number.' });
    if (!['Air conditioner', 'Refrigerator', 'Washing machine', 'Other appliance'].includes(payload.appliance)) return res.status(400).json({ message: 'Please choose an appliance from the list.' });
    if (payload.issue.length < 5 || payload.issue.length > 1200) return res.status(400).json({ message: 'Please describe the issue in 5 to 1200 characters.' });
    if (payload.area.length > 120 || payload.preferredTime.length > 120) return res.status(400).json({ message: 'Please shorten the area and preferred time fields.' });
    const booking = await Booking.create(payload);
    return res.status(201).json({ message: 'Your request has been received. Our team will call to confirm.', bookingId: booking.id });
  } catch (error) {
    return next(error);
  }
});

export default router;
