import bookingsRepository from '@/repositories/bookings-repository';

async function getBookingById(userId: number) {
  const booking = await bookingsRepository.findBookingById(userId);
  const bookingResponse = {
    id: booking.id,
    Room: booking.Room,
  };
  return bookingResponse;
}

const bookingsServices = { getBookingById };

export default bookingsServices;
