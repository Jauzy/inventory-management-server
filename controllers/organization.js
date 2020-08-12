require('dotenv').config()
const jwt = require("jsonwebtoken")

const bcrypt = require("bcrypt")
const saltRounds = 10;

const Organization = require('../models/organization')

class OrgController {
    static register(req, res) {
        const { password, email, organization_name } = req.body
        Organization.findOne({ email }).then((result) => {
            if (result) res.status(400).send({ message: 'Email Already Used!' })
            else {
                bcrypt.hash(password, saltRounds, function (err, hashedPassword) {
                    let organization = new Organization({
                        email, organization_name,
                        password: hashedPassword,
                    })
                    organization.save()
                        .then(() => {
                            res.send({ message: 'new Organization Added' })
                        })
                        .catch(err => console.log(err))
                });
            }
        })
    }

    static login(req, res) {
        const { email, password } = req.body
        Organization.findOne({ email })
            .then(user => {
                if (!user) res.status(400).send({ message: 'Wrong email or password' })
                bcrypt.compare(password, user.password, function (err, result) {
                    if (err) console.log(err)
                    else {
                        if (result) {
                            const token = jwt.sign({ id: user._id, email: user.email, type: 'Organization' }, process.env.SECRETKEY)
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
        Organization.findById(req.user.id).then(user => {
            if (!user) res.status(400).send({ message: 'Organization not found!' })
            else {
                const { password, email, ...approved } = req.body
                Organization.findByIdAndUpdate(req.user.id, { ...approved }).then(() => {
                    res.send({ message: 'Update info success!' })
                })
            }
        })
    }

    static changePassword(req, res) {
        Organization.findById(req.user.id).then(user => {
            if (!user) res.status(400).send({ message: 'Organization not found!' })
            else {
                const { newPassword, oldPassword } = req.body
                bcrypt.compare(oldPassword, user.password, function (err, result) {
                    if (err) console.log(err)
                    else {
                        if (result) {
                            bcrypt.hash(newPassword, saltRounds, function (err, hashedPassword) {
                                Organization.findByIdAndUpdate(req.user.id, { password: hashedPassword }).then(() => {
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

    static getOrganizationData(req, res) {
        Organization.findById(req.user.id)
            .then(result => {
                res.send(result)
            })
            .catch(err => console.log(err))
    }

    static getOrganizationsCount(req, res) {
        Organization.find({}).then(orgs => {
            res.send({ organizationCount: orgs.length })
        })
    }
}

module.exports = OrgController