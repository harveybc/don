/** @desc
  Method names according to the Google Cloud API Naming Conventions https://cloud.google.com/apis/design/naming_convention
*/
const Route = use('Route');
// VIEWS
Route.get('/', 'ProcessesController.AdminView')
/** @desc AdminView: Deletes a process */
Route.get('/processes/admin', 'ProcessesController.AdminView')
/** @desc AdminView: Deletes a process */
Route.get('/processes/detail/:id', 'ProcessesController.DetailView')
/** @desc AdminView: Deletes a process */
Route.get('/processes/create', 'ProcessesController.CreateView')
/** @desc AdminView: Deletes a process */
Route.get('/processes/update/:id', 'ProcessesController.UpdateView')
// PROCESSES COLLECTION MANAGEMENT:
/** @desc MetadataList: get a list of processes' metadata */
Route.get('/processes/metadata', 'ProcessesController.MetadataList');
/** @desc MetadataItem: get a list of a process' metadata */
Route.get('/processes/metadata/:id', 'ProcessesController.MetadataItem');
/** @desc GetList: get a list of processes */
Route.get('/processes', 'ProcessesController.GetList');
/** @desc GetItem: get a process */
Route.get('/processes/:id', 'ProcessesController.GetItem'); 
/** @desc CreateItem: create a process */
Route.post('/processes', 'ProcessesController.CreateItem');
/** @desc CreateItem: update a process */
Route.post('/processes/:id', 'ProcessesController.UpdateItem'); 
/** @desc DeleteItem: Deletes a process */
Route.delete('/processes/:id', 'ProcessesController.DeleteItem');
/*** Web Interface ***/
/** @desc AdminView: Grid view with edit, details and  */
Route.get('/processes/admin', 'ProcessesController.AdminView')
/** @desc AdminView: Deletes a process */
Route.get('/processes/detail/:id', 'ProcessesController.DetailView')
/** @desc AdminView: Deletes a process */
Route.get('/processes/create', 'ProcessesController.CreateView')
/** @desc AdminView: Deletes a process */
Route.get('/processes/update/:id', 'ProcessesController.UpdateView')
