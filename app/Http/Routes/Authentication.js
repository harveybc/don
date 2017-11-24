/** @desc
  Method names according to the Google Cloud API Naming Conventions https://cloud.google.com/apis/design/naming_convention
*/
const Route = use('Route');
// VIEWS
Route.get('/authentication/admin', 'AuthenticationController.AdminView')
/** @desc AdminView: Deletes a process */
Route.get('/authentication/detail/:id', 'AuthenticationController.DetailView')
/** @desc AdminView: Deletes a process */
Route.get('/authentication/create', 'AuthenticationController.CreateView')
/** @desc AdminView: Deletes a process */
Route.get('/authentication/update/:id', 'AuthenticationController.UpdateView')
// AUTHENTICATION COLLECTION MANAGEMENT:
/** @desc MetadataList: get a list of authentication' metadata */
Route.get('/authentication/metadata', 'AuthenticationController.MetadataList');
/** @desc MetadataItem: get a list of a process' metadata */
Route.get('/authentication/metadata/:id', 'AuthenticationController.MetadataItem');
/** @desc GetList: get a list of authentication */
Route.get('/authentication', 'AuthenticationController.GetList');
/** @desc GetItem: get a process */
Route.get('/authentication/:id', 'AuthenticationController.GetItem'); 
/** @desc CreateItem: create a process */
Route.post('/authentication', 'AuthenticationController.CreateItem');
/** @desc CreateItem: update a process */
Route.patch('/authentication/:id', 'AuthenticationController.UpdateItem'); 
/** @desc DeleteItem: Deletes a process */
Route.delete('/authentication/:id', 'AuthenticationController.DeleteItem');
/*** Web Interface ***/
/** @desc AdminView: Grid view with edit, details and  */
Route.get('/authentication/admin', 'AuthenticationController.AdminView')
/** @desc AdminView: Deletes a process */
Route.get('/authentication/detail/:id', 'AuthenticationController.DetailView')
/** @desc AdminView: Deletes a process */
Route.get('/authentication/create', 'AuthenticationController.CreateView')
/** @desc AdminView: Deletes a process */
Route.get('/authentication/update/:id', 'AuthenticationController.UpdateView')
