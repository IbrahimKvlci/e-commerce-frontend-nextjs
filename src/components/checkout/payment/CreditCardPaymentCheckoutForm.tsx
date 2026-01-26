"use client"
import React, { useState } from "react";
import { CreditCard, Calendar, Lock, User } from "lucide-react";
import { useCheckout } from "@/context/CheckoutContext";

export default function CreditCardPaymentCheckout() {
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [cardName, setCardName] = useState("");
    const { setPaymentValid, setCreditCardCheckout, creditCardCheckout } = useCheckout();

    // Check validation and update context whenever fields change
    React.useEffect(() => {
        const isCardNumberValid = cardNumber.replace(/\s/g, "").length === 16;
        const isExpiryValid = expiryDate.length === 5; // MM/YY
        const isCvvValid = cvv.length >= 3;
        const isNameValid = cardName.trim().length > 0;

        setPaymentValid(isCardNumberValid && isExpiryValid && isCvvValid && isNameValid);

        // Sync with global state
        if (isCardNumberValid || isExpiryValid || isCvvValid || isNameValid) {
            const [month, year] = expiryDate.includes('/') ? expiryDate.split('/') : ['', ''];
            const cardNumberField = (cardNumber.replace(/\s/g, ""));

            setCreditCardCheckout(prev => ({
                ...prev,
                cardNumber: cardNumberField,
                cardExpireDateYear: year,
                cardExpiteDateMonth: month,
                cardCVV: cvv,
                cardHolderName: cardName
            }));
        }
    }, [cardNumber, expiryDate, cvv, cardName, setPaymentValid, setCreditCardCheckout]);

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Remove all non-digits
        let value = e.target.value.replace(/\D/g, "");
        // Limit to 16 digits
        if (value.length > 16) {
            value = value.slice(0, 16);
        }
        // Add space every 4 digits
        const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");
        setCardNumber(formattedValue);
    };

    const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Remove all non-digits
        let value = e.target.value.replace(/\D/g, "");
        // Limit to 4 digits (MMYY)
        if (value.length > 4) {
            value = value.slice(0, 4);
        }
        // Add slash after 2 digits
        if (value.length >= 3) {
            value = `${value.slice(0, 2)}/${value.slice(2)}`;
        }
        setExpiryDate(value);
    };

    const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Remove all non-digits
        let value = e.target.value.replace(/\D/g, "");
        // Limit to 4 digits (some cards have 4)
        if (value.length > 4) {
            value = value.slice(0, 4);
        }
        setCvv(value);
    };

    return (
        <div>
            <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200/50 space-y-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-gray-900">Card Information</h3>
                        <div className="flex gap-2">
                            {/* Simple visual placeholders for card brands */}
                            <div className="h-6 w-10 bg-white rounded border border-gray-200 shadow-sm"></div>
                            <div className="h-6 w-10 bg-white rounded border border-gray-200 shadow-sm"></div>
                            <div className="h-6 w-10 bg-white rounded border border-gray-200 shadow-sm"></div>
                        </div>
                    </div>

                    {/* Card Number */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Card Number</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <CreditCard className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                            </div>
                            <input
                                type="text"
                                value={cardNumber}
                                onChange={handleCardNumberChange}
                                placeholder="0000 0000 0000 0000"
                                maxLength={19}
                                className="block w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all text-gray-900 shadow-sm placeholder-gray-400 font-mono"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Expiry Date */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Expiry Date</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Calendar className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    value={expiryDate}
                                    onChange={handleExpiryDateChange}
                                    placeholder="MM / YY"
                                    maxLength={5}
                                    className="block w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all text-gray-900 shadow-sm placeholder-gray-400"
                                />
                            </div>
                        </div>

                        {/* CVC */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">CVC / CVV</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    value={cvv}
                                    onChange={handleCvvChange}
                                    placeholder="123"
                                    maxLength={4}
                                    className="block w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all text-gray-900 shadow-sm placeholder-gray-400"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Name on Card */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Name on Card</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                            </div>
                            <input
                                type="text"
                                value={cardName}
                                onChange={(e) => setCardName(e.target.value)}
                                placeholder="John Doe"
                                className="block w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all text-gray-900 shadow-sm placeholder-gray-400 uppercase tracking-wide"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
