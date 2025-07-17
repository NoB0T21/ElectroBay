import mongoose, { Document, Schema , Model} from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

interface owner extends Document{
    name: string,
    email: string,
    picture: string,
    password: string,
    generateToken(): Promise<string>;
    comparePassword(password:string, hash:string): Promise<boolean>
}

interface OwnerModel extends Model<owner> {
    hashpassword(password: string): Promise<string>;
}

const ownerSchema: Schema<owner> = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    picture:{
        type: String,
    },
    password:{
        type: String,
        required: true
    }
})

ownerSchema.methods.generateToken = async function (): Promise<string> {
    const key: string | undefined = process.env.SECRET_KEY || 'default'
    const token = jwt.sign({
        _id: this._id,
        name: this.name,
        email: this.email
    },key,{expiresIn: '1d'})
    return token
}

ownerSchema.methods.comparePassword = async function(password:string, hash:string): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
}

ownerSchema.statics.hashpassword = async function(password:string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt)
    return hash;
}

const owner= mongoose.model<owner, OwnerModel>('Owner',ownerSchema);
export default owner