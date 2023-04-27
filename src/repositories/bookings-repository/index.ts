import { Booking } from '@prisma/client';
import { prisma } from '@/config';

async function findBookingById(userId: number): Promise<Booking> {
  return prisma.booking.findFirst({
    where: {
      userId,
    },
  });
}

export default { findBookingById };
