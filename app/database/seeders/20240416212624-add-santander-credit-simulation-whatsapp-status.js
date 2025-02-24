'use strict'

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'santander_credit_simulation_whatsapp_status',
      [
        {
          id: 1,
          name: 'PHONE_NOT_EXIST',
          description: 'The message could not be sent because the phone number does not exist.',
        },
        {
          id: 2,
          name: 'INCOMPLETE_CHAT',
          description: 'Customer did not complete the chatbot flow.',
        },
        {
          id: 3,
          name: 'ASSIGNED',
          description: 'Customer completed the chatbot flow.',
        },
        {
          id: 4,
          name: 'NO_ANSWER',
          description: 'Customer does not answer the messages.',
        },
        {
          id: 5,
          name: 'CONTINUE_BY_CALL',
          description: 'Customer wants to proceed with the process via phone call.',
        },
        {
          id: 6,
          name: 'NOT_QUALIFIED',
          description: 'Customer is not qualified due to risks..',
        },
        {
          id: 7,
          name: 'NOT_INTERESTED',
          description: 'Customer does not want to continue at this time.',
        },
        {
          id: 8,
          name: 'FINANCED_WITH_OTHER_INSTITUTION',
          description: 'Customer financed credit with another institution.',
        },
        {
          id: 9,
          name: 'OFFER_SCHEDULE_SENT',
          description: 'The offer/schedule has been sent to the customer.',
        },
        {
          id: 10,
          name: 'DISAGREE_WITH_TEA',
          description: 'Customer does not agree with the TEA.',
        },
        {
          id: 11,
          name: 'DISAGREE_WITH_MAX_TERM',
          description: 'Customer does not agree with the maximum term.',
        },
        {
          id: 12,
          name: 'DISAGREE_WITH_TCEA',
          description: 'Customer does not agree with the TCEA.',
        },
        {
          id: 13,
          name: 'NOT_MEET_MINIMUM_DOWN_PAYMENT',
          description: 'Customer does not meet the minimum initial down payment.',
        },
        {
          id: 14,
          name: 'APPROVED_PENDING_VEHICLE',
          description: 'Credit approved but pending vehicle details.',
        },
        {
          id: 15,
          name: 'WITHDRAWN',
          description: 'Customer has decided not to proceed.',
        },
        {
          id: 16,
          name: 'DISBURSED',
          description: 'Credit disbursed.',
        },
      ],
      {},
    )
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('santander_credit_simulation_whatsapp_status', null, {})
  },
}
