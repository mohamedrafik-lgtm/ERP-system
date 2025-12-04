// Distribution Types

export type DistributionType = 'THEORY' | 'PRACTICAL';

export interface TraineeInRoom {
  id: number;
  nameAr: string;
  nameEn: string;
  nationalId: string;
  phone: string;
  guardianPhone: string;
  photoUrl: string | null;
}

export interface RoomAssignment {
  id: string;
  roomId: string;
  traineeId: number;
  orderNumber: number;
  notes: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
  trainee: TraineeInRoom;
}

export interface DistributionRoom {
  id: string;
  distributionId: string;
  roomName: string;
  roomNumber: number;
  capacity: number | null;
  createdAt: Date | string;
  updatedAt: Date | string;
  assignments: RoomAssignment[];
  _count: {
    assignments: number;
  };
}

export interface Distribution {
  id: string;
  programId: number;
  type: DistributionType;
  numberOfRooms: number;
  academicYear: string;
  createdBy: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  program: {
    id: number;
    nameAr: string;
    nameEn: string;
  };
  rooms: DistributionRoom[];
  _count: {
    rooms: number;
  };
}

export type DistributionsResponse = Distribution[];