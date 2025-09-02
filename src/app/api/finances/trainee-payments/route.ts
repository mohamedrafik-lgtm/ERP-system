import { NextRequest, NextResponse } from 'next/server';
import { TraineePaymentResponse } from '@/types/payment';

// Mock data for trainee payments
const mockTraineePayments: TraineePaymentResponse[] = [
  {
    id: 1,
    amount: 5000,
    status: 'PENDING',
    paidAmount: 0,
    paidAt: undefined,
    notes: 'رسوم التسجيل',
    fee: {
      id: 1,
      name: 'رسوم التسجيل',
      amount: 5000,
      type: 'REGISTRATION'
    },
    trainee: {
      id: 1,
      name: 'أحمد محمد علي'
    },
    safe: {
      id: '1',
      name: 'الخزينة الرئيسية'
    },
    transactions: []
  },
  {
    id: 2,
    amount: 3000,
    status: 'PARTIALLY_PAID',
    paidAmount: 1500,
    paidAt: '2024-01-15T10:30:00Z',
    notes: 'رسوم الدورة التدريبية',
    fee: {
      id: 2,
      name: 'رسوم الدورة التدريبية',
      amount: 3000,
      type: 'COURSE'
    },
    trainee: {
      id: 2,
      name: 'فاطمة أحمد حسن'
    },
    safe: {
      id: '2',
      name: 'خزينة الرسوم'
    },
    transactions: [
      {
        id: '1',
        amount: 1500,
        type: 'PAYMENT',
        createdAt: '2024-01-15T10:30:00Z'
      }
    ]
  },
  {
    id: 3,
    amount: 2000,
    status: 'PAID',
    paidAmount: 2000,
    paidAt: '2024-01-20T14:15:00Z',
    notes: 'رسوم الشهادة',
    fee: {
      id: 3,
      name: 'رسوم الشهادة',
      amount: 2000,
      type: 'CERTIFICATE'
    },
    trainee: {
      id: 3,
      name: 'محمد عبدالله السعيد'
    },
    safe: {
      id: '3',
      name: 'خزينة الشهادات'
    },
    transactions: [
      {
        id: '2',
        amount: 2000,
        type: 'PAYMENT',
        createdAt: '2024-01-20T14:15:00Z'
      }
    ]
  },
  {
    id: 4,
    amount: 4000,
    status: 'PENDING',
    paidAmount: 0,
    paidAt: undefined,
    notes: 'رسوم التدريب المتقدم',
    fee: {
      id: 4,
      name: 'رسوم التدريب المتقدم',
      amount: 4000,
      type: 'ADVANCED_TRAINING'
    },
    trainee: {
      id: 4,
      name: 'نورا خالد المطيري'
    },
    safe: {
      id: '1',
      name: 'الخزينة الرئيسية'
    },
    transactions: []
  },
  {
    id: 5,
    amount: 1500,
    status: 'PARTIALLY_PAID',
    paidAmount: 750,
    paidAt: '2024-01-25T09:45:00Z',
    notes: 'رسوم المواد التدريبية',
    fee: {
      id: 5,
      name: 'رسوم المواد التدريبية',
      amount: 1500,
      type: 'MATERIALS'
    },
    trainee: {
      id: 5,
      name: 'عبدالرحمن سعد القحطاني'
    },
    safe: {
      id: '4',
      name: 'خزينة الطوارئ'
    },
    transactions: [
      {
        id: '3',
        amount: 750,
        type: 'PAYMENT',
        createdAt: '2024-01-25T09:45:00Z'
      }
    ]
  }
];

// GET /api/finances/trainee-payments
export async function GET(request: NextRequest) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    let filteredPayments = [...mockTraineePayments];

    // Apply search filter
    if (search) {
      filteredPayments = filteredPayments.filter(payment =>
        payment.trainee.name.toLowerCase().includes(search.toLowerCase()) ||
        payment.fee.name.toLowerCase().includes(search.toLowerCase()) ||
        payment.trainee.id.toString().includes(search)
      );
    }

    // Apply status filter
    if (status && status !== 'all') {
      filteredPayments = filteredPayments.filter(payment => payment.status === status);
    }

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPayments = filteredPayments.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      data: paginatedPayments,
      pagination: {
        page,
        limit,
        total: filteredPayments.length,
        totalPages: Math.ceil(filteredPayments.length / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching trainee payments:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch trainee payments' },
      { status: 500 }
    );
  }
}

// POST /api/finances/trainee-payments
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { traineeId, amount, safeId, notes } = body;

    // Validate required fields
    if (!traineeId || !amount || !safeId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate amount
    if (amount <= 0) {
      return NextResponse.json(
        { success: false, error: 'Amount must be greater than 0' },
        { status: 400 }
      );
    }

    // Find the trainee payment to update
    const existingPayment = mockTraineePayments.find(p => p.trainee.id === traineeId);
    if (!existingPayment) {
      return NextResponse.json(
        { success: false, error: 'Trainee payment not found' },
        { status: 404 }
      );
    }

    // Check if payment amount exceeds remaining amount
    const remainingAmount = existingPayment.amount - existingPayment.paidAmount;
    if (amount > remainingAmount) {
      return NextResponse.json(
        { success: false, error: 'Payment amount exceeds remaining amount' },
        { status: 400 }
      );
    }

    // Update the payment
    const newPaidAmount = existingPayment.paidAmount + amount;
    const newStatus = newPaidAmount >= existingPayment.amount ? 'PAID' : 'PARTIALLY_PAID';

    existingPayment.paidAmount = newPaidAmount;
    existingPayment.status = newStatus;
    existingPayment.paidAt = new Date().toISOString();

    // Add transaction record
    const newTransaction = {
      id: Date.now().toString(),
      amount: amount,
      type: 'PAYMENT',
      createdAt: new Date().toISOString()
    };
    existingPayment.transactions.push(newTransaction);

    // Update notes if provided
    if (notes) {
      existingPayment.notes = notes;
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    return NextResponse.json({
      success: true,
      data: existingPayment,
      message: 'Payment added successfully'
    });

  } catch (error) {
    console.error('Error adding trainee payment:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add payment' },
      { status: 500 }
    );
  }
}
