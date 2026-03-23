export default interface Student {
    firstName: string,
    lastName : string,
    loggedIn : boolean,
    email? : string
};

export interface Admin extends Student {
    role : string,
    permission : string[]
};




