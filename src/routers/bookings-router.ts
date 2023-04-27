import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getBookingById } from '@/controllers/bookings-controller';

const bookingsRouter = Router();

bookingsRouter.all('/*', authenticateToken).get('/', getBookingById);

export { bookingsRouter };
