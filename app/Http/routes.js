// REST API routes for the adonis.js framework
// Created: Harvey D. Bastidas C. 20170921
// This file is part of the singularity platform project
'use strict'

const Route = use('Route')

// Method names according to the Google Cloud API Naming Conventions https://cloud.google.com/apis/design/naming_convention
// 
// PROCESSES COLLECTION MANAGEMENT:
// MetadataList: get a list of processes' metadata 
Route.get('/processes/metadata', 'ProcessesStubController.MetadataList')
// MetadataItem: get a list of a process' metadata
Route.get('/processes/metadata/:id', 'ProcessesStubController.MetadataItem')
// GetList: get a list of processes
Route.get('/processes', 'ProcessesStubController.GetList')
// GetItem: get a process
Route.get('/processes/:id', 'ProcessesStubController.GetItem')
// CreateItem: create a process
Route.post('/processes', 'ProcessesStubController.CreateItem')
// DeleteItem: Deletes a process
Route.delete('/processes/:id', 'ProcessesStubController.DeleteItem')
// EmptyCollection: Deletes all processes in a collection for which the user is admin
Route.delete('/processes', 'ProcessesStubController.EmptyCollection')
//
// APPLICATIONS COLLECTION MANAGEMENT:
// MetadataList: get a list of processes' metadata 
Route.get('/processes/metadata', 'ProcessesController.MetadataList')

