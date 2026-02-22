"use client"

import { toast } from "react-toastify";
import { updateCustomerInfo } from "../actions";
import { CustomerInfoRequest } from "@/models/auth/CustomerInfoRequest";
import { useRouter } from "next/navigation";

interface ProfileUpdateBtnProps {
    customerInfo: CustomerInfoRequest;
    onSuccess: () => void;
}

export default function ProfileUpdateBtn({ customerInfo, onSuccess }: ProfileUpdateBtnProps) {
    const router = useRouter();

    const onClick = () => {
        updateCustomerInfo(customerInfo).then((customerInfoResponse) => {
            if (customerInfoResponse.success) {
                toast.success("Bilgileriniz güncellendi.");
                onSuccess();
            } else {
                toast.error(customerInfoResponse.message);
            }
        });
    }

    return (
        <button onClick={onClick} className="bg-indigo-600 py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Değişiklikleri Kaydet
        </button>
    )
}