export interface CreditCardCheckout {
    cardNumber: string,
    cardExpireDateYear: string,
    cardExpiteDateMonth: string,
    cardCVV: string,
    cardHolderName: string,
    billAddressId: number,
    shipAddressId: number,
    isSecured: boolean,
    notes: string,
    secured: boolean
}