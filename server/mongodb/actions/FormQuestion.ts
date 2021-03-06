import EligibilityQuestionSchema from '../models/EligibilityQuestion'
import { eligibilityQuestion } from 'server/models/EligibilityQuestion'
import DocumentQuestionSchema from '../models/DocumentQuestion'
import { documentQuestion } from 'server/models/DocumentQuestion'
import OtherQuestionSchema from '../models/OtherQuestion'
import { otherQuestion } from 'server/models/OtherQuestion'
import mongoDB from '../index'
import { Types } from 'mongoose'

export async function addEligibilityQuestion (question: eligibilityQuestion): Promise<eligibilityQuestion> {
  await mongoDB()
  return await EligibilityQuestionSchema.create({
    title: question.title,
    question: question.question
  })
}

export async function addDocumentQuestion (question: documentQuestion): Promise<documentQuestion> {
  await mongoDB()
  return await DocumentQuestionSchema.create({
    title: question.title,
    description: question.description
  })
}

export async function addOtherQuestion (question: otherQuestion): Promise<otherQuestion> {
  await mongoDB()
  return await OtherQuestionSchema.create({ question: question.question })
}

export async function getEligibilityQuestions (): Promise<eligibilityQuestion[]> {
  await mongoDB()
  const questions = await EligibilityQuestionSchema.find()
  return questions
}

export async function getDocumentQuestions (): Promise<documentQuestion[]> {
  await mongoDB()
  const questions = await DocumentQuestionSchema.find()
  return questions
}

export async function getOtherQuestions (): Promise<otherQuestion[]> {
  await mongoDB()
  const questions = await OtherQuestionSchema.find()
  return questions
}

export async function editEligibilityQuestion (question: eligibilityQuestion): Promise<eligibilityQuestion> {
  await mongoDB()
  return await EligibilityQuestionSchema.findByIdAndUpdate(question._id, { title: question.title, question: question.question }) as eligibilityQuestion
}

export async function editDocumentQuestion (question: documentQuestion): Promise<documentQuestion> {
  await mongoDB()
  return await DocumentQuestionSchema.findByIdAndUpdate(question._id, { title: question.title, description: question.description }) as documentQuestion
}

export async function editOtherQuestion (question: otherQuestion): Promise<otherQuestion> {
  await mongoDB()
  return await OtherQuestionSchema.findByIdAndUpdate(question._id, { question: question.question }) as otherQuestion
}

export async function removeEligibilityQuestion (questionId: Types.ObjectId): Promise<eligibilityQuestion> {
  await mongoDB()
  return await EligibilityQuestionSchema.findByIdAndDelete(questionId) as eligibilityQuestion
}

export async function removeDocumentQuestion (questionId: Types.ObjectId): Promise<documentQuestion> {
  await mongoDB()
  return await DocumentQuestionSchema.findByIdAndDelete(questionId) as documentQuestion
}

export async function removeOtherQuestion (questionId: Types.ObjectId): Promise<otherQuestion> {
  await mongoDB()
  return await OtherQuestionSchema.findByIdAndDelete(questionId) as otherQuestion
}
