const User = require("../models/User");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {

    try {

        const {
            username,
            email,
            password
        } = req.body;

        if (!username || !email || !password) {

            res.status(400).json({

                message: "Please provide all required fields"

            });

            return;
        }

        if (password.length < 6) {

            res.status(400).json({

                message: "Password must be at least 6 characters long"

            });

            return;
        }

        if(!email.includes("@")) {

            res.status(400).json({

                message: "Enter the email correctly"

            });

            return;

        }

        const match = await User.findOne({
            email: email
        });


        if (!match) {

            const hashPassword = await bcrypt.hash(password, 10);

            const user = new User({

               username: username,
               email: email,
               password: hashPassword

            });

            await user.save();

            res.status(201).json({

                message: "User registered successfully"

            });

            return

        }

        return res.status(400).json({message: "User already exists"});

    } catch (error) {

        console.error("Error during signup:", error.message);
        res.status(500).json({

            message: "Internal Server Error"

        });

    }
};

const login = async (req, res) => {

    const {
        email,
        password
    } = req.body;

    try {

        if (!(email && password)) {

            return res.status(400).json({message:"do not leave empty space"});

        }

        const user = await User.findOne({

            email: email

        });

        if (!user || !(await bcrypt.compare(password, user.password))) {

            res.status(401).json({

                message: "Invalid credentials"

            });

            return;
        }

        req.session.isAuth = true;
        req.session.fullName = user.username;
        req.session.email = user.email;
        const url = req.query.returnUrl || "/";

        res.json({
            message: "Login successful"
        });

        return

    } catch (error) {

        console.error("Error during login:", error.message);

        res.status(500).json({

            message: "Internal Server Error"

        });


    }
};

logout = async (req, res) => {

    try {

        if ( req.session.isAuth ) {
            req.session.destroy(() => {
                res.status(500).json({

                    message: "You have successfully logged out"

                });
                return
            });
        }

        res.status(500).json({

            message: "Log in first"

        });

        return

    } catch (err) {

        console.log(err);

    }
}

module.exports = {
    signup,
    login,
    logout
};