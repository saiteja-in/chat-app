import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";
export const signUpUser = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (password != confirmPassword) {
      return res.status(400).json({ error: "passwords dont match" });
    }
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "username already exists" });
    }

    //we will hash the password here
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // we will keep the profile photo from api  https://avatar.iran.liara.run/public/boy?username=teja
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName, //can also be written as fullName:fullName
      username, //username:username
      password: hashedPassword, //password:password
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });
    //another way of creating an item in db, await User.create({})  also works
    if (newUser) {
        //generate jwt token here
        generateTokenAndSetCookie(newUser._id,res)
      await newUser.save();
      // res.status(201).json({
      //   _id: newUser._id,
      //   fullName: newUser.fullName,
      //   username: newUser.username,
      //   profilePic: newUser.profilePic,
      // });
    } else {
      res.status(400).json({ error: "invalid user data" });
    }
  } catch (error) {
    console.log("error in signup controller ", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const loginUser = async (req, res) => {
  try{
    const {username,password}=req.body;
    const user= await User.findOne({username})
    // Check if user exists and if the password is correct
    if (!user) {
        return res.status(400).json({ error: "Invalid username or password" });
      }
  
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ error: "Invalid username or password" });
      }
    generateTokenAndSetCookie(user._id,res);
    res.status(200).json({
        _id:user.id,
        fullName:user.fullName,
        username:user.username,
        profilePic:user.profilePic
    })

  }catch(error){
    console.log("error in login controller ", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const logoutUser = (req, res) => {
  try {
        res.clearCookie("jwt");
        //res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"logged out successfully"})
        
    
  } catch (error) {
    console.log("error in logout controller ", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
