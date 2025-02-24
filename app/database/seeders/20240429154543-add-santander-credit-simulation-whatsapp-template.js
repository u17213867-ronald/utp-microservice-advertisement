'use strict'

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'santander_credit_simulation_whatsapp_template',
      [
        {
          source: 'ADVERTISEMENT_FORM',
          flow: 'SUPER_EXPRESS',
          laborRegime: 'DEPENDENT',
          templateId: '66268c3ccb08080010d28ee3',
        },
        {
          source: 'LANDING_FORM',
          flow: 'SUPER_EXPRESS',
          laborRegime: 'DEPENDENT',
          templateId: '66268c509af97d0011eba22b',
        },
        {
          source: 'ADVERTISEMENT_FORM',
          flow: 'EXPRESS',
          laborRegime: 'DEPENDENT',
          templateId: '66268c6ccb08080010d28ee4',
        },
        {
          source: 'LANDING_FORM',
          flow: 'EXPRESS',
          laborRegime: 'DEPENDENT',
          templateId: '66268c7b9af97d0011eba22f',
        },
        {
          source: 'ADVERTISEMENT_FORM',
          flow: 'REGULAR',
          laborRegime: 'INDEPENDENT',
          templateId: '662688cccb08080010d28ecb',
        },
        {
          source: 'LANDING_FORM',
          flow: 'REGULAR',
          laborRegime: 'INDEPENDENT',
          templateId: '662688f89af97d0011eba213',
        },
        {
          source: 'ADVERTISEMENT_FORM',
          flow: 'REGULAR',
          laborRegime: 'OTHER',
          templateId: '662688e4cb08080010d28ecc',
        },
        {
          source: 'LANDING_FORM',
          flow: 'REGULAR',
          laborRegime: 'OTHER',
          templateId: '66268920cb08080010d28ece',
        },
        {
          source: 'AGENCY_SERVICE',
          flow: null,
          laborRegime: null,
          templateId: '662688f89af97d0011eba213',
        },
      ],
      {},
    )
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('santander_credit_simulation_whatsapp_template', null, {})
  },
}
