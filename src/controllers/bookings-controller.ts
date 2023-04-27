import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { Room } from '@prisma/client';
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
  const body = req.body as Pick<Room, 'id'>;
  const { userId } = req;
  try {
    if (!body) return res.sendStatus(httpStatus.UNPROCESSABLE_ENTITY);

    const booking = await bookingsServices.createBooking(userId, body.id);

    return res.status(httpStatus.OK).send(booking.id);
  } catch (error) {
    next(error);
  }
}
