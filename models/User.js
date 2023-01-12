'use strict';

const {encryptPass} = require("../helpers/bcryptjs");

module.exports = async(mongoose) => {
  const newSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required:[true, "First Name is required"]
    },
    lastName: {
      type: String,
      required:[true, "Last Name is required"]
    },
    gender: {
      type: String,
      enum: {
        values: ["Female","Male"],
        message:"{VALUE} gender is not supported"
      }
    },
    email: {
      type: String,
      required:[true, "Email is required"],
      unique:[true, "Email already exist"]
    },
    password: {
      type: String,
      required:[true, "Password is required"],
      min: [6, "Password length minimum must be 6 characters"]
    },
    birthDate: {
      type: Date
    },
    role: {
      type: String,
      required:[true,"Role cannot be empty"],
      enum: {
        values: ["User", "Subscribed"],
        message:"{VALUE} is not supported"
      }
    },
    avatar: {
      type:String
    },
    watchList: {
      type: [{type:mongoose.Schema.ObjectId, ref:"Movie"}]
    }
  }, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

  newSchema.pre("validate", function(next) {
    this.role = this.role ?? "User";
    next();
  })

  newSchema.pre("save", function(next) {
    const newPass = encryptPass(this.password);
    this.password = newPass;
    next()
  })
  newSchema.index({"email":1}, {unique:true});
  const User = mongoose.model('User', newSchema);
  return User;
};