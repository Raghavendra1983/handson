import { LoginInitValuesType } from "../../types/authTypes";
import axiosInstance from "../../utils/axios";

export class AuthService {
    login = async (values: LoginInitValuesType) => {

        const response = await axiosInstance.post('login', values);
        return response.data;
    }
}