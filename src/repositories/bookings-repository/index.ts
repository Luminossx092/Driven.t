import { Booking, Room } from '@prisma/client';
import { prisma } from '@/config';

async function findBookingById(userId: number): Promise<
  Booking & {
    Room: Room;
  }
> {
  return prisma.booking.findFirst({
    where: {
      userId,
    },
    include: {
      Room: true,
    },
  });
}

export default { findBookingById };
