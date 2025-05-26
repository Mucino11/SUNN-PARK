"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BottomNavigation from "../components/navigation/BottomNavigation";

interface Booking {
  date: string;
  startTime: string;
  endTime: string;
  id: number;
}

export default function PaymentPage() {
  const router = useRouter();
  const [showCreditCardForm, setShowCreditCardForm] = useState(false);
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });
  const [bookingDetails, setBookingDetails] = useState<Booking | null>(null);

  useEffect(() => {
    const savedBookings = localStorage.getItem("parkingBookings");
    if (savedBookings) {
      const bookings = JSON.parse(savedBookings);
      // Get the most recent booking
      const latestBooking = bookings[bookings.length - 1];
      setBookingDetails(latestBooking);
    }
  }, []);

  const handleBackClick = () => {
    router.push("/zoneDetails");
  };

  const handleCreditCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would typically process the payment
    alert("Payment and Reservation confirmed");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-blue-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={handleBackClick}
          className="text-3xl text-gray-800 hover:text-gray-600 transition-colors"
        >
          &#8592;
        </button>
        <h2 className="font-bold text-2xl text-gray-900">
          Confirm Reservation
        </h2>
        <Link href="/profile">
          <Image
            src="/img/pexels-linkedin-2182970.jpg"
            alt="Profile"
            width={50}
            height={50}
            className="rounded-full cursor-pointer hover:opacity-90 transition-opacity"
          />
        </Link>
      </div>

      <div className="flex gap-8 mb-8">
        <div className="flex-1 bg-gray-100 p-6 rounded-xl shadow">
          <div className="flex justify-center mb-4">
            <div className="bg-purple-600 text-white w-14 h-14 rounded-full flex items-center justify-center text-xl">
              5
            </div>
          </div>
          <p className="text-gray-800">
            <strong className="text-gray-900">Name:</strong> John Smith
          </p>
          <p className="text-gray-800">
            <strong className="text-gray-900">Zone:</strong> 5
          </p>
          <p className="text-gray-800">
            <strong className="text-gray-900">Address:</strong> 1453 Bjornemyr
          </p>
          <p className="text-gray-800">
            <strong className="text-gray-900">Parking spot:</strong> Spot 10
          </p>
          {bookingDetails && (
            <>
              <p className="text-gray-800">
                <strong className="text-gray-900">Date:</strong>{" "}
                {formatDate(bookingDetails.date)}
              </p>
              <p className="text-gray-800">
                <strong className="text-gray-900">Time:</strong>{" "}
                {bookingDetails.startTime} - {bookingDetails.endTime}
              </p>
            </>
          )}
        </div>

        <div className="flex-1">
          <h3 className="text-2xl font-semibold mb-4 text-gray-900">
            Choose Payment Method
          </h3>

          <div className="space-y-3 mb-6">
            <button
              onClick={() => setShowCreditCardForm(true)}
              className="w-full p-4 rounded-xl bg-pink-200 text-gray-900 text-left text-lg hover:bg-pink-300 transition-colors"
            >
              💳 Credit Card
            </button>
            <button
              onClick={() => alert("Vipps payment coming soon!")}
              className="w-full p-4 rounded-xl bg-orange-200 text-gray-900 text-left text-lg hover:bg-orange-300 transition-colors"
            >
              📱 Betal med Vipps
            </button>
            <button
              onClick={() => alert("PayPal payment coming soon!")}
              className="w-full p-4 rounded-xl bg-gray-200 text-gray-900 text-left text-lg hover:bg-gray-300 transition-colors"
            >
              🅿️ PayPal
            </button>
          </div>

          {showCreditCardForm && (
            <form onSubmit={handleCreditCardSubmit} className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Card Number
                </label>
                <input
                  type="text"
                  maxLength={16}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 text-gray-900"
                  value={cardInfo.cardNumber}
                  onChange={(e) =>
                    setCardInfo({ ...cardInfo, cardNumber: e.target.value })
                  }
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    maxLength={5}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                    value={cardInfo.expiryDate}
                    onChange={(e) =>
                      setCardInfo({ ...cardInfo, expiryDate: e.target.value })
                    }
                    placeholder="MM/YY"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    CVV
                  </label>
                  <input
                    type="text"
                    maxLength={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                    value={cardInfo.cvv}
                    onChange={(e) =>
                      setCardInfo({ ...cardInfo, cvv: e.target.value })
                    }
                    placeholder="123"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                  value={cardInfo.cardholderName}
                  onChange={(e) =>
                    setCardInfo({ ...cardInfo, cardholderName: e.target.value })
                  }
                  placeholder="John Doe"
                />
              </div>
            </form>
          )}

          <div className="flex justify-between mb-4 text-lg">
            <span className="text-gray-800">Total</span>
            <span className="text-green-600 font-bold">25 NOK / day</span>
          </div>

          <button
            onClick={handleCreditCardSubmit}
            className="bg-pink-500 text-white w-full py-3 rounded-xl shadow text-lg hover:bg-pink-600 transition-colors"
          >
            CONFIRM PAYMENT
          </button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
