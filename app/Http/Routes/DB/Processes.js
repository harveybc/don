/** @desc
  This file has the routes used for testing without AAA but with Database
  Method names according to the Google Cloud API Naming Conventions https://cloud.google.com/apis/design/naming_convention
*/
const Route = use('Route');
// PROCESSES COLLECTION MANAGEMENT:
/** @desc MetadataList: get a list of processes' metadata */
Route.get('/db/processes/metadata', 'DB/ProcessesDBController.MetadataList');
/** @desc MetadataItem: get a list of a process' metadata */
Route.get('/db/processes/metadata/:id', 'DB/ProcessesDBController.MetadataItem');
/** @desc GetList: get a list of processes */
Route.get('/db/processes', 'DB/ProcessesDBController.GetList');
/** @desc GetItem: get a process */
Route.get('/db/processes/:id', 'DB/ProcessesDBController.GetItem'); 
/** @desc CreateItem: create a process */
Route.post('/db/processes', 'DB/ProcessesDBController.CreateItem');
/** @desc CreateItem: update a process */
Route.put('/db/processes/:id', 'DB/ProcessesDBController.UpdateItem'); 
/** @desc DeleteItem: Deletes a process */
Route.delete('/db/processes/:id', 'DB/ProcessesDBController.DeleteItem');

