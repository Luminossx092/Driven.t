import { Booking, TicketStatus } from '@prisma/client';
import { forbiddenError, notFoundError } from '@/errors';
import bookingsRepository from '@/repositories/bookings-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import roomsRepository from '@/repositories/rooms-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function getBookingById(userId: number) {
  const booking = await bookingsRepository.findBookingById(userId);
  const bookingResponse = {
    id: booking.id,
    Room: booking.Room,
  };
  return bookingResponse;
}

async function createBooking(userId: number, roomId: number): Promise<Booking> {
  const room = await roomsRepository.findRoomById(roomId);
  if (!room) throw notFoundError();

  if (room.capacity <= room.Booking.length) throw forbiddenError('Room capacity full');

  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw forbiddenError('No enrollment');

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw forbiddenError('No ticket');

  if (ticket.TicketType.isRemote || !ticket.TicketType.includesHotel || ticket.status !== TicketStatus.PAID)
    throw forbiddenError('Invalid ticket');

  const booking = await bookingsRepository.createBooking(userId, roomId);
  return booking;
}

async function updateBooking(userId: number, roomId: number, bookingId: number) {
  const room = await roomsRepository.findRoomById(roomId);
  if (!room) throw notFoundError();

  if (room.capacity <= room.Booking.length) throw forbiddenError('Room is full');

  const booking = await bookingsRepository.findBookingById(userId);
  if (!booking) throw forbiddenError('No booking for user');

  const response = await bookingsRepository.update(roomId, bookingId);
  return response;
}

const bookingsServices = { getBookingById, createBooking, updateBooking };

export default bookingsServices;
