const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const User = require("./User");
const cors = require("cors");
app.use(cors());

// Port
const port = process.env.PORT || 5000;

//Connection
app.listen(port, () => console.log(`listening on port ${port}...`));

// Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "cv");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage }).single("file");
// Multer Upload
app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send("File Uploaded!");
  });
});

// DB Connection
const uri =
  "mongodb+srv://myclusterdb:myclusterdb@firstcluster.jwjmluu.mongodb.net/?retryWrites=true&w=majority";

async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
  }
}

connectDB();

// Post Hundler
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// mDB Create Method
async function createCandidate(uid, fn, ln, mail, desc, cv) {
  const user = await User.create({
    candidate_id: uid,
    firstName: fn,
    lastName: ln,
    Email: mail,
    Description: desc,
    cvPath: cv,
  });
  console.log("Candidate Created!", user);
}
// mDB Find Method
async function findCandidate(uID) {
  const user = await User.find({ candidate_id: uID });
  return user;
}

// mDB Count Method
async function countCandidate() {
  const c = await User.find({}).count();
  return c;
}

// Find all API
app.get("/candidate/find", (req, res) => {
  User.find({}).then((x) => {
    res.send(x);
  });
});

// Find ID API
app.get("/candidate/find/:uid", (req, res) => {
  const u = findCandidate(req.params.uid);

  u.then(function (result) {
    console.log(result);
    res.send(result);
  });
});

// Create API
app.post("/candidate", (req, res) => {
  const c = countCandidate();

  c.then(function (result) {
    createCandidate(
      result + 1,
      req.body.firstName,
      req.body.lastName,
      req.body.Email,
      req.body.Description,
      req.body.cvPath
    ).then(() => {
      res.status(200).send("hello!");
    });
  });
});

// Count API
app.get("/candidate/count", (req, res) => {
  let a;
  User.find({})
    .count()
    .then((x) => {
      a = x;
      console.log(a);
    })
    .then(() => {
      res.send(String(a));
    });
});
