import faker from 'faker'
import { v4 as uuid } from 'uuid'

console.time('Generated database in')

/**
 * @param {number} max
 */
function randomNumber(max) {
  return Math.floor(Math.random() * max)
}

/**
 * @template {unknown} T
 * @param {number} length
 * @param {() => T} creator
 * @returns {T[]}
 */
function create(length, creator) {
  return Array(length).fill(undefined).map(() => creator())
}

/**
 * @template {unknown} T
 * @param {T[]} data
 * @returns {T}
 */
function pickRandom(data) {
  const num = randomNumber(data.length)
  return /** @type {T} */ (data[num])
}

export const organizations = create(3, () => ({
  id: uuid(),
  name: faker.company.companyName()
}))

export const users = create(500, () => {
  const user = faker.helpers.userCard()

  return {
    ...user,
    id: uuid(),
    organization: pickRandom(organizations).id,
  }
})

export const surveys = create(2500, () => {
  const org = pickRandom(organizations)
  const usersInOrg = users.filter(user => user.organization === org.id)

  return {
    id: uuid(),
    name: faker.lorem.words(randomNumber(9) + 1),
    creator: pickRandom(usersInOrg).id,
    organization: org.id,
    fields: create(randomNumber(25), () => ({
      id: uuid(),
      label: faker.lorem.sentence()
    }))
  }
})

export const questionnaires = create(5000, () => {
  const survey = pickRandom(surveys)
  const org = survey.organization
  const usersInOrg = users.filter(user => user.organization === org)

  return {
    id: uuid(),
    survey: survey.id,
    resposible: pickRandom(
      usersInOrg.filter(user => user.id === survey.creator)
    ),
    answers: survey.fields.map(field => ({
      id: field.id,
      value: faker.lorem.words(randomNumber(11) + 1)
    }))
  }
})

console.timeEnd('Generated database in')
