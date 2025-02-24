'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Agregar el campo 'salary'
    await queryInterface.addColumn('announcement', 'salary', {
      type: Sequelize.FLOAT,
      allowNull: true,
    });

    // Agregar el campo 'created_at' con valor por defecto al insertar
    await queryInterface.addColumn('announcement', 'created_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });

    // Agregar el campo 'updated_at' que se actualiza automáticamente
    await queryInterface.addColumn('announcement', 'updated_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('announcement', 'salary');
    await queryInterface.removeColumn('announcement', 'created_at');
    await queryInterface.removeColumn('announcement', 'updated_at');
  }
};


