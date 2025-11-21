import { apiGet } from "@/lib/clientApi";

export default class UserClientService {

    private API_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/user/`;

    async getUserId(): Promise<number> {
        const response: number = await apiGet(this.API_URL + "get-user-id");
        return response;
    }
}
