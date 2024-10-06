import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

// User schema definition
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

// Add the comparePassword method to the schema
userSchema.methods.comparePassword = async function (candidatePassword){
  return bcrypt.compare(candidatePassword, this.password);
};

// Export the model
export default mongoose.model('User', userSchema);
