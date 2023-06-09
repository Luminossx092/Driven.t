import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { createBooking, getBookingById, updateBooking } from '@/controllers/booking-controller';

const bookingsRouter = Router();

bookingsRouter
  .all('/*', authenticateToken)
  .get('/', getBookingById)
  .post('/', createBooking)
  .put('/:bookingId', updateBooking);

export { bookingsRouter };
