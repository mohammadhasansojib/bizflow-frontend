
import jwt, { JwtPayload } from "jsonwebtoken"

export const auth = (accessToken: string) => {
    try {
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload;

        return decoded;

    } catch (error) {
        console.log(error);
    }
}