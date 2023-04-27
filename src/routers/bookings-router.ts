import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { createBooking, getBookingById } from '@/controllers/bookings-controller';

const bookingsRouter = Router();

bookingsRouter.all('/*', authenticateToken).get('/', getBookingById).post('/', createBooking);

export { bookingsRouter };
