import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';

class LoginService{

    constructor(){
        this.auth = getAuth();
    }

async login(email, senha){
    try{
        const userCredencial = await signInWithEmailAndPassword(this.auth, email, senha);
        return userCredencial.user;
    } catch(error){
        console.log('Erro ao realizar login: ', error.message);
        throw error;
    }
    
}

}

export default LoginService;
