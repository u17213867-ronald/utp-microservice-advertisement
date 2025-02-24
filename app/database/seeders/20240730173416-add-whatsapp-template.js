'use strict'

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkDelete('whatsapp_template', null, {})

    await queryInterface.bulkInsert(
      'whatsapp_template',
      [
        {
          flow: 'SUPER_EXPRESS',
          assignment: 'Paperless',
          templateId: '66a9004c5f1ac400117b4ad7',
        },
        {
          flow: 'SUPER_EXPRESS',
          assignment: 'Sofia Mirror',
          templateId: '66a9000d5f1ac400117b4ad0',
        },
        {
          flow: 'SUPER_EXPRESS',
          assignment: 'Sofia 2.0',
          templateId: '66a900285f1ac400117b4ad3',
        },

        {
          flow: 'EXPRESS',
          assignment: 'Regular',
          templateId: '66a8ff9fa6c4fa0011565938',
        },
        {
          flow: 'EXPRESS',
          assignment: 'Sofia Mirror',
          templateId: '66a9000d5f1ac400117b4ad0',
        },
        {
          flow: 'EXPRESS',
          assignment: 'Sofia 2.0',
          templateId: '66a900285f1ac400117b4ad3',
        },

        {
          flow: 'REGULAR',
          assignment: 'Regular',
          templateId: '66a8ff9fa6c4fa0011565938',
        },
        {
          flow: 'REGULAR',
          assignment: 'Sofia Mirror',
          templateId: '66a9000d5f1ac400117b4ad0',
        },
        {
          flow: 'REGULAR',
          assignment: 'Sofia 2.0',
          templateId: '66a900285f1ac400117b4ad3',
        },
      ],
      {},
    )
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('whatsapp_template', null, {})
  },
}
