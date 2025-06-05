declare namespace Express {
    export interface Request {
        body: any;
    }
}

declare module 'express' {
    export = express;
}

declare module 'cors' {
    const cors: any;
    export = cors;
}

declare module 'dotenv' {
    export const config: () => void;
} 