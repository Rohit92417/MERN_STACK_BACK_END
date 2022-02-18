const User = require("../models/user-model");
const transport = require("../config/nodemailer");
const otpGenerator = require('otp-generator')


exports.create = async (req, res) => {
  let email = req.body.email;
  User.findOne({ email: email }).then((currentUser) => {
    if (currentUser) {
      res.status(401).json({message:"User already exist",currentUser});
    } else {
    let otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
      const mailOptions = {
        from: process.env.MAIL_USERNAME, // sender
        to: req.body.email, // receiver
        subject: "My tutorial brought me here", // Subject
        html: `<p>You have received this email using nodemailer, you are welcome ${otp}  ;)</p>`, // html body
      };
      transport.sendMail(mailOptions, function (err, result) {
        if (err) {
          res.send({
            message: err,
          });
        } else {
          transport.close();
          res.send({
            message: "Email has been sent: check your inbox!",
          });
        }
      });
    }
  });
};
