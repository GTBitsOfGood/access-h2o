/* eslint-disable */

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import mongoDB from '../index'
import User from '../models/User'
import CompanySchema from '../models/Company'
import errors from '../../../utils/consts'
import validator from 'email-validator'

const SALT_ROUNDS = 10
const TOKEN_DURATION = '7d'
const JWT_SECRET = process.env.JWT_SECRET

export async function login({ email, password }) {
  if (!email || !password) throw new Error(errors.user.MISSING_INFO)

  await mongoDB()
  const user = await User.findOne({ email })
  if (!user) throw new Error(errors.user.INCORRECT_LOGIN)

  const passwordMatch = await bcrypt.compare(password, user.password)
  if (!passwordMatch) throw new Error(errors.user.INCORRECT_LOGIN)

  const jwtPayload = { id: user._id }
  const jwtOptions = { expiresIn: TOKEN_DURATION }
  return jwt.sign(jwtPayload, JWT_SECRET, jwtOptions)
}

// uncomment to create admin login

// export async function signUp({ email, password }) {
//   if (!email || !password) throw new Error(errors.user.MISSING_INFO)

//   const validEmail = validator.validate(email)
//   if (!validEmail) throw new Error(errors.user.INVALID_EMAIL)
//   if (password.length < 8) throw new Error(errors.user.INVALID_PASSWORD)

//   await mongoDB()

//   let user = await User.findOne({ email })
//   if (user) throw new Error(errors.user.UNAVAILABLE_EMAIL)

//   const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

//   user = await User.create({
//     email,
//     password: hashedPassword,
//     isUtilityCompany: false
//   })

//   if (!user) throw new Error(errors.user.INVALID_ATTRIBUTES)

//   const jwtPayload = { id: user._id, email: user.email }
//   const jwtOptions = { expiresIn: TOKEN_DURATION }
//   return jwt.sign(jwtPayload, JWT_SECRET, jwtOptions)
// }

export async function signUp({ email, password, utilityCompanyName }) {
  if (!email || !password) throw new Error(errors.user.MISSING_INFO)

  const validEmail = validator.validate(email)
  if (!validEmail) throw new Error(errors.user.INVALID_EMAIL)
  if (password.length < 8) throw new Error(errors.user.INVALID_PASSWORD)

  await mongoDB()
  // let utilityCompany = await CompanySchema.findById(utilityCompanyId)

  // if (!utilityCompany) throw new Error(errors.company.UNAVAILABLE_COMPANY)

  let user = await User.findOne({ email })
  if (user) throw new Error(errors.user.UNAVAILABLE_EMAIL)

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

  // if (utilityCompany) {
  //   user = await User.create({
  //     email,
  //     password: hashedPassword,
  //     isUtilityCompany: false
  //   })
  // } else {
  //   user = await User.create({
  //     email,
  //     password: hashedPassword,
  //     isUtilityCompany: true,
  //     utilityCompany
  //   })
  // }

  user = await User.create({
    email,
    password: hashedPassword,
    isUtilityCompany: true
  })

  if (!user) throw new Error(errors.user.INVALID_ATTRIBUTES)

  let utilityCompany = await CompanySchema.create({
    accountId: user._id,
    name: utilityCompanyName,
    email: email,
    number: '1234',
    address: '1234',
    city: '12345',
    state: '12345',
    zip: '12346'
  })

  if (!utilityCompany) throw new Error(errors.company.INVALID_ATTRIBUTES)

  await User.updateOne(
    { _id: user._id },
    { utilityCompany: utilityCompany._id }
  )

  const jwtPayload = { id: user._id, email: user.email }
  const jwtOptions = { expiresIn: TOKEN_DURATION }
  return jwt.sign(jwtPayload, JWT_SECRET, jwtOptions)
}

export async function update({ id, ...attributes }) {
  if (!id) throw new Error(errors.user.MISSING_INFO)

  if (attributes.password) {
    attributes.password = await bcrypt.hash(attributes.password, SALT_ROUNDS)
  }

  await mongoDB()
  const user = await User.findOne({ _id: id })
  if (!user) throw new Error(errors.user.INVALID_ID)

  const updatedUser = await User.findOneAndUpdate({ _id: id }, attributes, {
    new: true
  })
  if (!updatedUser) throw new Error(errors.user.INVALID_ATTRIBUTES)
  return updatedUser
}

export const getUserFromToken = async (token) => {
  if (!token) throw new Error(errors.token.DOESNT_EXIST)

  return jwt.verify(token, JWT_SECRET, async (error, { id }) => {
    if (error) throw new Error(errors.token.IS_INVALID)

    await mongoDB()
    const user = await User.findOne({ _id: id })
    if (!user) throw new Error(errors.token.DELETED_USER)

    return { id, email: user.email, isUtilityCompany: user.isUtilityCompany }
  })
}
