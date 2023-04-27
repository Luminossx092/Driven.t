import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import bookingsServices from '@/services/bookings-service';

export async function getBookingById(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;

    const booking = await bookingsServices.getBookingById(userId);
    if (!booking) return res.sendStatus(httpStatus.NOT_FOUND);

    return res.status(httpStatus.OK).send(booking);
  } catch (error) {
    /* if (error.name === 'UnauthorizedError') {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    } */
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
