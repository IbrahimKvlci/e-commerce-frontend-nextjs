"use client";

import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";
import { CreditCardCheckout } from "@/models/checkout/CreditCardCheckout";

interface CheckoutContextType {
    isAddressValid: boolean;
    setAddressValid: (valid: boolean) => void;
    isPaymentValid: boolean;
    setPaymentValid: (valid: boolean) => void;
    creditCardCheckout: CreditCardCheckout;
    setCreditCardCheckout: Dispatch<SetStateAction<CreditCardCheckout>>;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export function CheckoutProvider({ children }: { children: ReactNode }) {
    const [isAddressValid, setAddressValid] = useState(false);
    const [isPaymentValid, setPaymentValid] = useState(false);
    const [creditCardCheckout, setCreditCardCheckout] = useState<CreditCardCheckout>({} as CreditCardCheckout);

    return (
        <CheckoutContext.Provider value={{ isAddressValid, setAddressValid, isPaymentValid, setPaymentValid, creditCardCheckout, setCreditCardCheckout }}>
            {children}
        </CheckoutContext.Provider>
    );
}

export function useCheckout() {
    const context = useContext(CheckoutContext);
    if (context === undefined) {
        throw new Error("useCheckout must be used within a CheckoutProvider");
    }
    return context;
}
