import { NextResponse } from "next/server";

// GET /api/profile/payment-methods
export async function GET() {
  return NextResponse.json({
    data: [
      { id: 1, type: "VISA", last4: "4321", expiry: "05/26", default: true },
      {
        id: 2,
        type: "MasterCard",
        last4: "8765",
        expiry: "09/25",
        default: false,
      },
      { id: 3, type: "Vipps", last4: "2468", expiry: "07/27", default: false },
    ],
  });
}

// POST /api/profile/payment-methods
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // This is just a placeholder

    return NextResponse.json({
      message: "Payment method added successfully",
      data: {
        id: Date.now(), // Generate a test ID
        ...body,
        default: body.default || false,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add payment method" },
      { status: 400 }
    );
  }
}

// PUT /api/profile/payment-methods/:id
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    // This is a placeholder

    return NextResponse.json({
      message: "Payment method updated successfully",
      data: {
        id: params.id,
        ...body,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update payment method" },
      { status: 400 }
    );
  }
}

// DELETE /api/profile/payment-methods/:id
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // This is a placeholder
    return NextResponse.json({
      message: "Payment method deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete payment method" },
      { status: 400 }
    );
  }
}
