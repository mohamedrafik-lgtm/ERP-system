// Types for Distribution Statistics Page

export interface Trainee {
  id: string;
  nameAr: string;
  nameEn: string;
  nationalId: string;
  photoUrl: string | null;
}

export interface Assignment {
  id: string;
  roomId: string;
  traineeId: string;
  orderNumber: number;
  createdAt: string;
  updatedAt: string;
  trainee: Trainee;
}

export interface Room {
  id: string;
  distributionId: string;
  roomName: string;
  roomNumber: number;
  capacity: number | null;
  createdAt: string;
  updatedAt: string;
  assignments: Assignment[];
  _count: {
    assignments: number;
  };
}

export interface Program {
  id: number;
  nameAr: string;
  nameEn: string;
}

export interface Distribution {
  id: string;
  programId: number;
  type: "THEORY" | "PRACTICAL";
  numberOfRooms: number;
  academicYear: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  program: Program;
  rooms: Room[];
  _count: {
    rooms: number;
  };
}

export interface CreateDistributionFormData {
  programId: number;
  type: 'THEORY' | 'PRACTICAL';
  numberOfRooms: number;
  roomCapacities?: number[];
}

export type DistributionType = 'ALL' | 'THEORY' | 'PRACTICAL';
