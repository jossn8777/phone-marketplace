import { PATHS } from './../apis/index';
import { LoginInfos } from '../entities/loginInfo';
import BE from '../apis';

export const login = async (info: LoginInfos) => {
    try {
        const result = await BE.post(PATHS.LOGIN, { data: info })
        if (result) {
            localStorage.setItem('accessToken', result.accessToken);
        }
    } catch (error) {
        throw error;
    }
};