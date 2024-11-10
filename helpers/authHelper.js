import bcrypt, { hash } from 'bcrypt';

export const hashPassword = async (password) =>{
    try {
        const saltRounds = 10; //cpu processing will apply if round increased
        const hashedPassword  = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.log(error);
    }
}

export const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
}
