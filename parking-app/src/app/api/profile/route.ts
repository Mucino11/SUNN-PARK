import { NextResponse } from "next/server";

// GET /api/profile
export async function GET() {
  // This is just a placeholder - you would normally fetch this data from your database
  const profileData = {
    name: "John Smith",
    avatar: "/profile-avatar.jpg",
    email: "john.smith@example.com",
    phone: "+47 123 45 678",
    address: "B R A Veien 6A",
    memberSince: "January 2023",
    favoriteZones: ["Zone 5", "Zone 1"],
    vehicles: [
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
    ],
    paymentMethods: [
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
    stats: {
      totalSpent: "4,250 kr",
      totalHours: "67 hours",
      mostVisitedZone: "Zone 5",
      averageStay: "2.4 hours",
    },
    logs: [
      {
        id: 1,
        date: "11/04/2025",
        formattedDate: "April 11, 2025",
        duration: "3 hours",
        startTime: "08:30",
        endTime: "11:30",
        parking: "Spot 10",
        total: "100.50kr",
        zone: "1",
        location: "Zone 1",
        status: "Completed",
      },
      {
        id: 2,
        date: "10/04/2025",
        formattedDate: "April 10, 2025",
        duration: "3 hours",
        startTime: "13:15",
        endTime: "16:15",
        parking: "Spot 10",
        total: "100.50kr",
        zone: "5",
        location: "Zone 5",
        status: "Completed",
      },
      {
        id: 3,
        date: "09/04/2025",
        formattedDate: "April 9, 2025",
        duration: "3 hours",
        startTime: "10:00",
        endTime: "13:00",
        parking: "Spot 10",
        total: "100.50kr",
        zone: "5",
        location: "Zone 5",
        status: "Completed",
      },
    ],
  };

  return NextResponse.json({ data: profileData });
}

// PUT /api/profile
export async function PUT(request: Request) {
  try {
    const body = await request.json();

    // TODO: Update profile in database

    return NextResponse.json({
      message: "Profile updated successfully",
      data: body,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 400 }
    );
  }
}

// GET /api/profile/vehicles
export async function GET_VEHICLES() {
  return NextResponse.json({
    data: [
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
    ],
  });
}

// GET /api/profile/payment-methods
export async function GET_PAYMENT_METHODS() {
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

// GET /api/profile/logs
export async function GET_LOGS() {
  return NextResponse.json({
    data: [
      {
        id: 1,
        date: "11/04/2025",
        formattedDate: "April 11, 2025",
        duration: "3 hours",
        startTime: "08:30",
        endTime: "11:30",
        parking: "Spot 10",
        total: "100.50kr",
        zone: "1",
        location: "Zone 1",
        status: "Completed",
      },
      {
        id: 2,
        date: "10/04/2025",
        formattedDate: "April 10, 2025",
        duration: "3 hours",
        startTime: "13:15",
        endTime: "16:15",
        parking: "Spot 10",
        total: "100.50kr",
        zone: "5",
        location: "Zone 5",
        status: "Completed",
      },
      {
        id: 3,
        date: "09/04/2025",
        formattedDate: "April 9, 2025",
        duration: "3 hours",
        startTime: "10:00",
        endTime: "13:00",
        parking: "Spot 10",
        total: "100.50kr",
        zone: "5",
        location: "Zone 5",
        status: "Completed",
      },
    ],
  });
}
