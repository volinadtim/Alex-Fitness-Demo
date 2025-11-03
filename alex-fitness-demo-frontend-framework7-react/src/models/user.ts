export interface User {
    firstName: string;
    lastName: string;
    about: string;
    links: {
        title: string;
        url: string;
    }[];
}
