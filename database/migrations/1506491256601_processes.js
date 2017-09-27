'use strict'

const Schema = use('Schema')

class ProcessesTableSchema extends Schema {

  up () {
    this.table('processes', (table) => {
      // alter processes table
    })
  }

  down () {
    this.table('processes', (table) => {
      // opposite of up goes here
    })
  }

}

module.exports = ProcessesTableSchema
