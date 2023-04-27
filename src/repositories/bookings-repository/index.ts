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

async function createBooking(userId: number, roomId: number): Promise<Booking> {
  return prisma.booking.create({
    data: {
      userId,
      roomId,
    },
  });
}

export default { findBookingById, createBooking };
