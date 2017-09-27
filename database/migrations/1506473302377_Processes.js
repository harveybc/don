'use strict'

const Schema = use('Schema')

class ProcessesTableSchema extends Schema {

  up () {
    this.create('processes', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('processes')
  }

}

module.exports = ProcessesTableSchema
