import jwt from 'jsonwebtoken'

export default function getData(token: any) {
    const data:any = jwt.verify(token, process.env.TOKEN_SECRET!);
    return data.id;
}