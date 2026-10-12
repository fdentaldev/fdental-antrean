export type QueuePatient = {
  newMedRecNumber: string
  fullName: string
}

export type QueueBranch = {
  id: number
  branchName: string
  branchTitle: string
  branchAddressLine1: string
  branchAddressLine2: string
  branchLogoUrl?: string
}

export type DoctorSchedule = {
  startTime: string
  endTime: string
}

export type QueueVisit = {
  id: string
  queueNumber: string | number
  visitStatus: string
  patient: QueuePatient
}

export type NowServing = QueueVisit

export type QueueDoctor = {
  id: string
  name: string
  schedule: DoctorSchedule
  nowServing: NowServing | null
}

export type WaitingQueueItem = QueueVisit & {
  attendingDoctor: {
    id: string
    name: string
  }
}

export type QueueVideo =
  | {
      type: 'youtube'
      url: string
      title?: string
    }
  | {
      type: 'internal'
      urls?: string[]
      url?: string
      title?: string
    }

export type QueueData = {
  branch: QueueBranch
  serverTime: string
  doctors: QueueDoctor[]
  queue: WaitingQueueItem[]
  waitingCount: number
  announcements: string[]
  video?: QueueVideo
}
