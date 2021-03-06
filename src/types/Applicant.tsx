export enum ApplicantStatus {
  AwaitingUtility = 'Awaiting Utility',
  AwaitingAccessH2O = 'Awaiting AccessH2O',
  Approved = 'Approved',
  Completed = 'Completed',
  Denied = 'Denied',
  Terminated = 'Terminated',
}

export const ApplicantStatusColor: { [key in ApplicantStatus]: string } = {
  [ApplicantStatus.Approved]: '#BEF2BD',
  [ApplicantStatus.AwaitingAccessH2O]: '#BDECF2',
  [ApplicantStatus.AwaitingUtility]: '#F2E3BD',
  [ApplicantStatus.Completed]: '#D4BDF2',
  [ApplicantStatus.Denied]: '#F2BDBD',
  [ApplicantStatus.Terminated]: '#C5C7CA'
}

export interface Applicant {
  name: string
  utilityCompany: string
  accountId: string
  status: ApplicantStatus
  propertyAddress: string
  applied: Date
  notes?: [string]
  eligibilityStatuses?: {
    question: string
    answer: boolean
  }
  documents?: [String]
  otherQuestions?: [string]
}
