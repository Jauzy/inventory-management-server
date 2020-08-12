require('dotenv').config()
const jwt = require("jsonwebtoken")

const bcrypt = require("bcrypt")
const saltRounds = 10;

const Admin = require('../models/admin')

class AdminController {
    static register(req, res) {
        const { password, email, name } = req.body
        Admin.findOne({ email }).then((result) => {
            if (result) res.status(400).send({ message: 'Email Already Used!' })
            else {
                bcrypt.hash(password, saltRounds, function (err, hashedPassword) {
                    let admin = new Admin({
                        email, name,
                        password: hashedPassword,
                    })
                    admin.save()
                        .then(() => {
                            res.send({ message: 'new Admin Added' })
                        })
                        .catch(err => console.log(err))
                });
            }
        })
    }

    static login(req, res) {
        const { email, password } = req.body
        Admin.findOne({ email })
            .then(user => {
                if (!user) res.status(400).send({ message: 'Wrong email or password' })
                bcrypt.compare(password, user.password, function (err, result) {
                    if (err) console.log(err)
                    else {
                        if (result) {
                            const token = jwt.sign({ id: user._id, email: user.email, type: 'Admin' }, process.env.SECRETKEY)
                            const { __v, password, ...userData } = user._doc
                            res.send({ message: 'Login successfully', user: { ...userData }, token })
                        }
                        else {
                            res.status(400).send({ message: 'Wrong email or password' })
                        }
                    }
                });
            })
            .catch(err => console.log(err))
    }

    static updateInfo(req, res) {
        Admin.findById(req.user.id).then(user => {
            if (!user) res.status(400).send({ message: 'Admin not found!' })
            else {
                const { password, email, ...approved } = req.body
                Admin.findByIdAndUpdate(req.user.id, { ...approved }).then(() => {
                    res.send({ message: 'Update info success!' })
                })
            }
        })
    }

    static changePassword(req, res) {
        Admin.findById(req.user.id).then(user => {
            if (!user) res.status(400).send({ message: 'Admin not found!' })
            else {
                const { newPassword, oldPassword } = req.body
                bcrypt.compare(oldPassword, user.password, function (err, result) {
                    if (err) console.log(err)
                    else {
                        if (result) {
                            bcrypt.hash(newPassword, saltRounds, function (err, hashedPassword) {
                                Admin.findByIdAndUpdate(req.user.id, { password: hashedPassword }).then(() => {
                                    res.send({ message: 'Password Updated!' })
                                })
                            })
                        }
                        else {
                            res.status(400).send({ message: 'Wrong password!' })
                        }
                    }
                });
            }
        })
    }

    static getAdminData(req, res) {
        Admin.findById(req.user.id)
            .then(result => {
                res.send(result)
            })
            .catch(err => console.log(err))
    }

    static getAdminsCount(req, res) {
        Admin.find({}).then(admins => {
            res.send({ adminCount: admins.length })
        })
    }

}

module.exports = AdminController