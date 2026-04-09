import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // check fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields required" });
    }

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    res.status(201).json({
      message: "User registered successfully"
    });

  } catch (error) {
    console.log(error); 
    res.status(500).json({ message: "Server Error" });
  }
};


// LOGIN
export const loginUser = async (req, res) => {
    try {
  const { email, password } = req.body;

   // Check fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Please enter all fields",
      });
    }


    const user = await User.findOne({ email });
    if (!user){

      return res.status(400).json({ message: "You don't have an account. Please register first" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch){
      
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message : "Login Successful",
      token,
      user: {
        id : user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.log(err);
    
    res.status(500).json({ message: "Server error" });
  }
};

// LOGOUT
export const logoutUser = async (req, res) => {
  try{
    res.status(200).json({ message : "Logout Successful"})
  }
  catch(err){
      res.status(500).json({ message : "Logout Failed"})
      console.log(err);
  }
}