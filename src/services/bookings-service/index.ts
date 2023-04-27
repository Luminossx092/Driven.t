import { Booking } from '@prisma/client';
import bookingsRepository from '@/repositories/bookings-repository';

async function getBookingById(userId: number): Promise<Booking> {
  return await bookingsRepository.findBookingById(userId);
}

const bookingsServices = { getBookingById };

export default bookingsServices;
