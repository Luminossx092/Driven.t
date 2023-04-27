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

async function update(roomId: number, bookingId: number): Promise<Booking> {
  return prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      roomId,
    },
  });
}

export default { findBookingById, createBooking, update };
