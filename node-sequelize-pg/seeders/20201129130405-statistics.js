'use strict';

const data = new Date();
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert({ tableName: 'Statistics', schema: 'test' }, [
      { name: '2019', label: 'Jan', value: 25, createdAt: data, updatedAt: data },
      { name: '2019', label: 'Feb', value: 30, createdAt: data, updatedAt: data },
      { name: '2019', label: 'Mar', value: 15, createdAt: data, updatedAt: data },
      { name: '2019', label: 'Apr', value: 35, createdAt: data, updatedAt: data },
      { name: '2019', label: 'May', value: 45, createdAt: data, updatedAt: data },
      { name: '2019', label: 'Jun', value: 55, createdAt: data, updatedAt: data },
      { name: '2019', label: 'Jul', value: 56, createdAt: data, updatedAt: data },
      { name: '2019', label: 'Aug', value: 26, createdAt: data, updatedAt: data },
      { name: '2019', label: 'Sep', value: 29, createdAt: data, updatedAt: data },
      { name: '2019', label: 'Oct', value: 70, createdAt: data, updatedAt: data },
      { name: '2019', label: 'Nov', value: 90, createdAt: data, updatedAt: data },
      { name: '2019', label: 'Dec', value: 85, createdAt: data, updatedAt: data },
      { name: '2020', label: 'Jan', value: 15, createdAt: data, updatedAt: data },
      { name: '2020', label: 'Feb', value: 60, createdAt: data, updatedAt: data },
      { name: '2020', label: 'Mar', value: 75, createdAt: data, updatedAt: data },
      { name: '2020', label: 'Apr', value: 25, createdAt: data, updatedAt: data },
      { name: '2020', label: 'May', value: 75, createdAt: data, updatedAt: data },
      { name: '2020', label: 'Jun', value: 95, createdAt: data, updatedAt: data },
      { name: '2020', label: 'Jul', value: 96, createdAt: data, updatedAt: data },
      { name: '2020', label: 'Aug', value: 36, createdAt: data, updatedAt: data },
      { name: '2020', label: 'Sep', value: 19, createdAt: data, updatedAt: data },
      { name: '2020', label: 'Oct', value: 50, createdAt: data, updatedAt: data },
      { name: '2020', label: 'Nov', value: 30, createdAt: data, updatedAt: data },
      { name: '2020', label: 'Dec', value: 95, createdAt: data, updatedAt: data },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
