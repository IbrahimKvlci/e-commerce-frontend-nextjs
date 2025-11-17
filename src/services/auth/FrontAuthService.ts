import { apiPost } from "@/lib/clientApi";

export default class FrontAuthService{
    async logout() {
        const res = await apiPost(`/api/auth/logout`, {});
        return res;
    }
}