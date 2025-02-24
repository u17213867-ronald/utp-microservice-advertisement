'use strict'

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'santander_credit_simulation_whatsapp_executive',
      [
        {
          name: 'Diego Camacho',
          email: 'ejeventas2407@externos.santanderconsumer.com.pe',
          phone: '957817618',
          allocationPercentage: 20,
        },
        {
          name: 'Maria Victoria',
          email: 'ejeventas2403@externos.santanderconsumer.com.pe',
          phone: '921074522',
          allocationPercentage: 30,
        },
        {
          name: 'Maricruz Casique',
          email: 'ejeventas2409@externos.santanderconsumer.com.pe',
          phone: '904007743',
          allocationPercentage: 50,
        },
      ],
      {},
    )
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('santander_credit_simulation_whatsapp_executive', null, {})
  },
}
