const router = require("express").Router();
const User = require("../models/user");
const bcrypt=require("bcryptjs");
router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const hashpassword=bcrypt.hashSync(password);
    const user = new User({ email, username, password:hashpassword });
    await user
    .save()
    .then(()=>res.status(200).json({message:"Sign Up Successful"})
  );
  } catch (error) {
    console.error(error);
    res.status(200).json({ message: "User Already Exists" });
  }
})
router.post("/signin", async (req, res) => {
  try {
    const user=await User.findOne({email:res.body.email});
    if(!user){
      res.status(200).json({message:"Please Sign Up first"});
    }
    const isPasswordCorrect=bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if(!isPasswordCorrect){
      res.status(200).json({message:"Password is not correct"});
    }
    const{password,...others}=user._doc;
    res.status(200).json({ others});

  } catch (error) {
    console.error(error);
    res.status(200).json({ message: "User Already Exists" });
  }
});
module.exports = router;