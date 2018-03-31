/** @desc
  Method names according to the Google Cloud API Naming Conventions https://cloud.google.com/apis/design/naming_convention
*/
const Route = use('Route');
// VIEWS
/** @desc AdminView: manage applications */
Route.get('/applications/admin', 'ApplicationsController.AdminView')
/** @desc DetailView: Show details of a application */
Route.get('/applications/detail/:id', 'ApplicationsController.DetailView')
/** @desc CreateView: Create a application */
Route.get('/applications/create', 'ApplicationsController.CreateView')
/** @desc UpdateView: Update a application */
Route.get('/applications/update/:id', 'ApplicationsController.UpdateView')
// API
/** @desc GetList: get a list of applications */
Route.get('/applications', 'ApplicationsController.GetList');
/** @desc GetItem: get a application */
Route.get('/applications/:id', 'ApplicationsController.GetItem'); 
/** @desc CreateItem: create a application */
Route.post('/applications', 'ApplicationsController.CreateItem');
/** @desc UpdateItem: update a application */
Route.post('/applications/:id', 'ApplicationsController.UpdateItem'); 
/** @desc DeleteItem: Deletes a application */
Route.delete('/applications/:id', 'ApplicationsController.DeleteItem');
