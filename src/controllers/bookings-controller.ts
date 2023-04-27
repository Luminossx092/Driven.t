import { NextFunction, Response } from 'express';
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
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function createBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { roomId } = req.body as { roomId: number };
  const { userId } = req;
  try {
    const booking = await bookingsServices.createBooking(userId, roomId);
    return res.status(httpStatus.OK).send({ id: booking.id });
  } catch (error) {
    next(error);
  }
}

export async function updateBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const bookingId = req.params.bookingId;
  const { roomId } = req.body as { roomId: number };
  const { userId } = req;
  try {
    const booking = await bookingsServices.updateBooking(userId, roomId, Number(bookingId));
    return res.status(httpStatus.OK).send({ id: booking.id });
  } catch (error) {
    next(error);
  }
}
