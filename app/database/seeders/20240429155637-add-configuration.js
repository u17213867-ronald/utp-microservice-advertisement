'use strict'

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'configuration',
      [
        {
          name: 'WHATSAPP_ALLOWED',
          description: 'Allow sending messages via WhatsApp.',
          value: '1',
        },
        {
          name: 'TEST_DOCUMENT_NUMBER',
          description: 'Test document numbers for Santander credit simulation.',
          value: '{"name":"Karuro","00000001":"A","00000002":"B","00000003":"C"}',
        },
      ],
      {},
    )
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('configuration', null, {})
  },
}
