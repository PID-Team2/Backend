import { User } from "../models/User.js"

export const getUsers = async (req, res) => {
    const users = await User.findAll();
    console.log("All users:", JSON.stringify(users, null, 2));
}

export const postUser = async (req, res) => {
    const { name,  email, password } = req.body
    const user = await User.create({
        name,
        email,
        password
    })
    console.log(user)
    res.send('post user')
}