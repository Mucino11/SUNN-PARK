"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BottomNavigation from "../components/navigation/BottomNavigation";
import doctorImage from "../images/doctor-2.jpg";

interface Booking {
  date: string;
  startTime: string;
  endTime: string;
  id: number;
  zone: number;
}

export default function PaymentPage() {
  const router = useRouter();
  const [showCreditCardForm, setShowCreditCardForm] = useState(false);
  const [showVippsForm, setShowVippsForm] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });
  const [vippsNumber, setVippsNumber] = useState("");
  const [bookingDetails, setBookingDetails] = useState<Booking | null>(null);
  const [processing, setProcessing] = useState(false);

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
    router.back();
  };

  const handlePaymentMethodSelect = (method: string) => {
    setSelectedPaymentMethod(method);
    setShowCreditCardForm(method === "credit-card");
    setShowVippsForm(method === "vipps");
  };

  const handleCreditCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      alert("Payment successful! Parking reservation confirmed.");
      router.push("/");
    }, 2000);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\s/g, "").replace(/\D/g, "");
    value = value.substring(0, 16);
    value = value.replace(/(.{4})/g, "$1 ").trim();
    setCardInfo({ ...cardInfo, cardNumber: value });
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 2) {
      value = value.substring(0, 2) + "/" + value.substring(2, 4);
    }
    setCardInfo({ ...cardInfo, expiryDate: value });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const getZoneColor = (zone: number) => {
    switch (zone) {
      case 1: return "bg-gradient-to-br from-blue-400 to-blue-600";
      case 2: return "bg-gradient-to-br from-pink-400 to-pink-600";
      case 3: return "bg-gradient-to-br from-indigo-500 to-indigo-700";
      case 4: return "bg-gradient-to-br from-green-400 to-green-600";
      case 5: return "bg-gradient-to-br from-purple-500 to-purple-700";
      default: return "bg-gradient-to-br from-gray-400 to-gray-600";
    }
  };

  const paymentMethods = [
    {
      id: "credit-card",
      name: "Credit/Debit Card",
      description: "Visa, Mastercard, American Express",
      cardBg: "bg-white",
      textColor: "text-gray-900",
      descColor: "text-gray-600",
      iconBg: "bg-gray-100",
      iconColor: "text-gray-600",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      popular: true
    },
    {
      id: "vipps",
      name: "Vipps",
      description: "Quick mobile payment",
      cardBg: "bg-gradient-to-r from-orange-400 to-orange-500",
      textColor: "text-white",
      descColor: "text-orange-100",
      iconBg: "bg-white bg-opacity-20",
      iconColor: "text-white",
      icon: (
        <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
          <span className="text-orange-500 font-bold text-lg">V</span>
        </div>
      ),
      popular: false
    },
    {
      id: "paypal",
      name: "PayPal",
      description: "Secure online payment",
      cardBg: "bg-gradient-to-r from-blue-500 to-blue-600",
      textColor: "text-white",
      descColor: "text-blue-100",
      iconBg: "bg-white bg-opacity-20",
      iconColor: "text-white",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.29-.93 4.778-4.005 6.427-7.955 6.427h-2.313a.6.6 0 0 0-.592.75l.515 3.267a.6.6 0 0 0 .592.492h4.18c.459 0 .85-.334.925-.79l.514-3.267z"/>
        </svg>
      ),
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="flex justify-between items-center p-4 sm:p-6 max-w-7xl mx-auto">
          <button
            onClick={handleBackClick}
            className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent text-center">
            Complete Payment
          </h1>
          <Link href="/" className="rounded-full overflow-hidden ring-2 ring-blue-200 hover:ring-blue-300 transition-all">
            <Image
              src={doctorImage}
              alt="Profile"
              width={32}
              height={32}
              className="sm:w-10 sm:h-10 hover:opacity-90 transition-opacity"
            />
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 sm:p-6 pb-24">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Booking Summary */}
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-gray-100">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">Booking Summary</h2>
                <p className="text-sm sm:text-base text-gray-600">Review your parking reservation</p>
              </div>
              
              <div className="p-4 sm:p-6">
                {bookingDetails ? (
                  <div className="space-y-4">
                    {/* Zone Info */}
                    <div className="flex items-center gap-4">
                      <div className={`${getZoneColor(bookingDetails.zone || 5)} w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg`}>
                        {bookingDetails.zone || 5}
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900">Zone {bookingDetails.zone || 5}</h3>
                        <p className="text-sm sm:text-base text-gray-600">Premium parking area</p>
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-xs font-medium text-gray-500 uppercase">Date</span>
                        </div>
                        <p className="text-sm font-semibold text-gray-900">{formatDate(bookingDetails.date)}</p>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-xs font-medium text-gray-500 uppercase">Time</span>
                        </div>
                        <p className="text-sm font-semibold text-gray-900">{bookingDetails.startTime} - {bookingDetails.endTime}</p>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-xs font-medium text-gray-500 uppercase">Address</span>
                        </div>
                        <p className="text-sm font-semibold text-gray-900">1453 Bjørnemyr</p>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span className="text-xs font-medium text-gray-500 uppercase">Reserved for</span>
                        </div>
                        <p className="text-sm font-semibold text-gray-900">John Smith</p>
                      </div>
                    </div>

                    {/* Price Summary */}
                    <div className="border-t border-gray-200 pt-4 mt-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Parking fee</span>
                        <span className="text-gray-900 font-medium">25 NOK</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Service fee</span>
                        <span className="text-gray-900 font-medium">2 NOK</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                        <span className="text-lg font-semibold text-gray-900">Total</span>
                        <span className="text-xl font-bold text-green-600">27 NOK</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <p className="text-gray-500">No booking details found</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="order-1 lg:order-2">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-gray-100">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">Payment Method</h2>
                <p className="text-sm sm:text-base text-gray-600">Choose how you'd like to pay</p>
              </div>

              <div className="p-4 sm:p-6">
                <div className="space-y-3 mb-6">
                  {paymentMethods.map((method) => (
                                        <button
                      key={method.id}
                      onClick={() => handlePaymentMethodSelect(method.id)}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                        selectedPaymentMethod === method.id
                          ? "border-blue-500 ring-2 ring-blue-200 shadow-lg transform scale-105"
                          : `border-gray-200 hover:border-gray-300 hover:shadow-md ${method.cardBg}`
                      } ${selectedPaymentMethod !== method.id ? method.cardBg : 'bg-white'}`}
                    >
                      <div className="flex items-center gap-4">
                         <div className={`p-2 rounded-lg ${
                           selectedPaymentMethod === method.id ? "bg-blue-100" : method.iconBg
                         }`}>
                           {selectedPaymentMethod === method.id ? (
                             <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                             </svg>
                           ) : (
                             method.icon
                           )}
                         </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className={`font-semibold ${selectedPaymentMethod === method.id ? 'text-gray-900' : method.textColor}`}>
                              {method.name}
                            </h3>
                            {method.popular && (
                              <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                                Popular
                              </span>
                            )}
                          </div>
                          <p className={`text-sm ${selectedPaymentMethod === method.id ? 'text-gray-600' : method.descColor}`}>
                            {method.description}
                          </p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedPaymentMethod === method.id
                            ? "border-blue-500 bg-blue-500"
                            : method.id === 'vipps' || method.id === 'paypal' ? "border-white border-opacity-50" : "border-gray-300"
                        }`}>
                          {selectedPaymentMethod === method.id && (
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Credit Card Form */}
                {showCreditCardForm && (
                  <form onSubmit={handleCreditCardSubmit} className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                      <input
                        type="text"
                        maxLength={19}
                        className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:border-gray-300"
                        value={cardInfo.cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                        <input
                          type="text"
                          maxLength={5}
                          className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:border-gray-300"
                          value={cardInfo.expiryDate}
                          onChange={handleExpiryChange}
                          placeholder="MM/YY"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                        <input
                          type="text"
                          maxLength={3}
                          className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:border-gray-300"
                          value={cardInfo.cvv}
                          onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value.replace(/\D/g, "") })}
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                      <input
                        type="text"
                        className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:border-gray-300"
                        value={cardInfo.cardholderName}
                        onChange={(e) => setCardInfo({ ...cardInfo, cardholderName: e.target.value })}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </form>
                )}

                {/* Vipps Form */}
                {showVippsForm && (
                  <div className="mb-6 p-4 bg-orange-50 rounded-xl border border-orange-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">V</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-orange-900">Pay with Vipps</h3>
                        <p className="text-sm text-orange-700">Enter your Norwegian mobile number</p>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-orange-900 mb-2">Mobile Number</label>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2 px-3 py-3 sm:py-4 border-2 border-orange-200 rounded-xl bg-white">
                          <div className="w-6 h-4 bg-red-600 relative">
                            <div className="absolute inset-y-0 right-0 w-2 bg-white"></div>
                            <div className="absolute inset-y-0 right-0 w-1 bg-blue-600"></div>
                          </div>
                          <span className="text-sm font-medium text-gray-700">+47</span>
                        </div>
                        <input
                          type="tel"
                          maxLength={8}
                          className="flex-1 p-3 sm:p-4 border-2 border-orange-200 rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all shadow-sm hover:border-orange-300"
                          value={vippsNumber}
                          onChange={(e) => setVippsNumber(e.target.value.replace(/\D/g, ""))}
                          placeholder="12345678"
                          required
                        />
                      </div>
                      <p className="text-xs text-orange-600 mt-2">You will receive a push notification in the Vipps app to complete the payment</p>
                    </div>
                  </div>
                )}

                {/* Payment Button */}
                <button
                  onClick={selectedPaymentMethod === "credit-card" ? handleCreditCardSubmit : 
                           selectedPaymentMethod === "vipps" ? () => {
                             if (vippsNumber.length === 8) {
                               setProcessing(true);
                               setTimeout(() => {
                                 setProcessing(false);
                                 alert("Vipps payment request sent! Check your Vipps app to complete the payment.");
                                 router.push("/");
                               }, 2000);
                             } else {
                               alert("Please enter a valid 8-digit mobile number");
                             }
                           } : 
                           () => alert(`${selectedPaymentMethod} payment coming soon!`)}
                  disabled={!selectedPaymentMethod || processing || (selectedPaymentMethod === "vipps" && vippsNumber.length !== 8)}
                  className={`w-full py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition-all duration-200 ${
                    !selectedPaymentMethod || processing || (selectedPaymentMethod === "vipps" && vippsNumber.length !== 8)
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : selectedPaymentMethod === "vipps"
                      ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 active:scale-95 shadow-lg"
                      : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 active:scale-95 shadow-lg"
                  }`}
                >
                  {processing ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {selectedPaymentMethod === "vipps" ? "Sending Vipps request..." : "Processing..."}
                    </div>
                  ) : selectedPaymentMethod === "vipps" ? (
                    "Send Vipps Payment Request"
                  ) : (
                    "Complete Payment"
                  )}
                </button>

                {/* Security Notice */}
                <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-sm text-green-700 font-medium">Your payment is secured with 256-bit SSL encryption</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
