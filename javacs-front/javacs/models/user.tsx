export interface User {
    id?: number;
    email: string | null | undefined;
    photoUrl: string | null | undefined;
    firstName: string | null | undefined;
    lastName: string | null | undefined;
    uid?: string | null | undefined;
}