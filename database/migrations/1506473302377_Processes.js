'use strict'

const Schema = use('Schema')

class ProcessesTableSchema extends Schema {

  up () {
    this.create('processes', (table) => {
      table.increments('id')
      table.string('name', 4086)
      table.text('description', 40860)
      table.string('creator_key',4086)
      table.timestamps()
      table.string('tags',4086)
      table.integer('application_id')
      table.integer('last_block_time') 
      table.integer('last_block_size')
      table.float('last_optimum_performance')
      table.integer('last_optimum_id')
      table.timestamp('date_last_optimum')
      table.integer('desired_block_time')
      table.integer('desired_block_size')
      // block_time_control (0=CPoW,1=OPoW,2=block_size_det, 3=block_time_non_det, ,4=block_time_det, 5=block_size_non_det, 6= block_size_det), [
      table.integer('block_time_control')
      table.integer('difficulty')
    })
  }

  down () {
    this.drop('processes')
  }

}

module.exports = ProcessesTableSchema
