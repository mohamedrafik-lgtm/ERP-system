// Student Service implementing ISP
import { Student, BulkAssignData } from '../types';
import { IStudentService } from '../interfaces';

export class StudentService implements IStudentService {
  private students: Student[] = [];

  async getStudents(): Promise<Student[]> {
    // In real implementation, this would fetch from API
    return this.students;
  }

  async getStudentById(id: number): Promise<Student | null> {
    const student = this.students.find(s => s.id === id);
    return student || null;
  }

  async updateStudent(student: Student): Promise<Student> {
    const index = this.students.findIndex(s => s.id === student.id);
    if (index !== -1) {
      this.students[index] = student;
    }
    return student;
  }

  async deleteStudent(id: number): Promise<boolean> {
    const index = this.students.findIndex(s => s.id === id);
    if (index !== -1) {
      this.students.splice(index, 1);
      return true;
    }
    return false;
  }

  async assignStudents(data: BulkAssignData): Promise<boolean> {
    try {
      // Update student statuses
      data.studentIds.forEach(studentId => {
        const student = this.students.find(s => s.id === studentId);
        if (student) {
          student.status = 'assigned';
          student.assignedTo = `Distribution ${data.distributionId}`;
        }
      });
      return true;
    } catch (error) {
      console.error('Error assigning students:', error);
      return false;
    }
  }
}

