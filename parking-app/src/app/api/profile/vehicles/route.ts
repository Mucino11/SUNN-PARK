import { NextResponse } from "next/server";

// GET /api/profile/vehicles
export async function GET() {
  // This is a placeholder
  const vehicles = [
    {
      id: 1,
      plate: "AB 12345",
      make: "Tesla",
      model: "Model 3",
      color: "White",
      default: true,
    },
    {
      id: 2,
      plate: "CD 67890",
      make: "Volvo",
      model: "XC60",
      color: "Black",
      default: false,
    },
  ];

  return NextResponse.json({ data: vehicles });
}

// POST /api/profile/vehicles
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // This is a placeholder

    return NextResponse.json({
      message: "Vehicle added successfully",
      data: {
        id: Date.now(), // Generate a test ID
        ...body,
        default: body.default || false,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add vehicle" },
      { status: 400 }
    );
  }
}

// PUT /api/profile/vehicles/:id
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    // This is just a placeholder
    return NextResponse.json({
      message: "Vehicle updated successfully",
      data: {
        id: params.id,
        ...body,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update vehicle" },
      { status: 400 }
    );
  }
}

// DELETE /api/profile/vehicles/:id
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    return NextResponse.json({
      message: "Vehicle deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete vehicle" },
      { status: 400 }
    );
  }
}
