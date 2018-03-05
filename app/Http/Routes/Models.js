/** @desc
  Method names according to the Google Cloud API Naming Conventions https://cloud.google.com/apis/design/naming_convention
*/
const Route = use('Route');
// VIEWS
Route.get('/models/admin', 'ModelsController.AdminView')
/** @desc AdminView: Deletes a process */
Route.get('/models/detail/:id', 'ModelsController.DetailView')
/** @desc AdminView: Deletes a process */
Route.get('/models/create', 'ModelsController.CreateView')
/** @desc AdminView: Deletes a process */
Route.get('/models/update/:id', 'ModelsController.UpdateView')
// ACCOUNTING COLLECTION MANAGEMENT:
/** @desc GetList: get a list of models */
Route.get('/models', 'ModelsController.GetList');
/** @desc GetItem: get a process */
Route.get('/models/:id', 'ModelsController.GetItem'); 
/** @desc CreateItem: create a process */
Route.post('/models', 'ModelsController.CreateItem');
/** @desc CreateItem: update a process */
Route.patch('/models/:id', 'ModelsController.UpdateItem'); 
/** @desc DeleteItem: Deletes a process */
Route.delete('/models/:id', 'ModelsController.DeleteItem');
