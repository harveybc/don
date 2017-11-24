/** @desc
  Method names according to the Google Cloud API Naming Conventions https://cloud.google.com/apis/design/naming_convention
*/
const Route = use('Route');
// VIEWS
Route.get('/authorization/admin', 'AuthorizationController.AdminView')
/** @desc AdminView: Deletes a process */
Route.get('/authorization/detail/:id', 'AuthorizationController.DetailView')
/** @desc AdminView: Deletes a process */
Route.get('/authorization/create', 'AuthorizationController.CreateView')
/** @desc AdminView: Deletes a process */
Route.get('/authorization/update/:id', 'AuthorizationController.UpdateView')
// AUTHORIZATION COLLECTION MANAGEMENT:
/** @desc MetadataList: get a list of authorization' metadata */
Route.get('/authorization/metadata', 'AuthorizationController.MetadataList');
/** @desc MetadataItem: get a list of a process' metadata */
Route.get('/authorization/metadata/:id', 'AuthorizationController.MetadataItem');
/** @desc GetList: get a list of authorization */
Route.get('/authorization', 'AuthorizationController.GetList');
/** @desc GetItem: get a process */
Route.get('/authorization/:id', 'AuthorizationController.GetItem'); 
/** @desc CreateItem: create a process */
Route.post('/authorization', 'AuthorizationController.CreateItem');
/** @desc CreateItem: update a process */
Route.patch('/authorization/:id', 'AuthorizationController.UpdateItem'); 
/** @desc DeleteItem: Deletes a process */
Route.delete('/authorization/:id', 'AuthorizationController.DeleteItem');
/*** Web Interface ***/
/** @desc AdminView: Grid view with edit, details and  */
Route.get('/authorization/admin', 'AuthorizationController.AdminView')
/** @desc AdminView: Deletes a process */
Route.get('/authorization/detail/:id', 'AuthorizationController.DetailView')
/** @desc AdminView: Deletes a process */
Route.get('/authorization/create', 'AuthorizationController.CreateView')
/** @desc AdminView: Deletes a process */
Route.get('/authorization/update/:id', 'AuthorizationController.UpdateView')
