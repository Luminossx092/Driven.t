import { prisma } from '@/config';

async function findRoomById(roomId: number) {
  return prisma.room.findFirst({
    where: {
      id: roomId,
    },
    include: {
      Booking: true,
    },
  });
}

const roomsRepository = {
  findRoomById,
};

export default roomsRepository;
