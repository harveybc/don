/** @desc
  Method names according to the Google Cloud API Naming Conventions https://cloud.google.com/apis/design/naming_convention
*/
const Route = use('Route');
// VIEWS
Route.get('/inputs/admin', 'InputsController.AdminView')
/** @desc AdminView: Deletes a process */
Route.get('/inputs/detail/:id', 'InputsController.DetailView')
/** @desc AdminView: Deletes a process */
Route.get('/inputs/create', 'InputsController.CreateView')
/** @desc AdminView: Deletes a process */
Route.get('/inputs/update/:id', 'InputsController.UpdateView')
// ACCOUNTING COLLECTION MANAGEMENT:
/** @desc GetList: get a list of inputs */
Route.get('/inputs', 'InputsController.GetList');
/** @desc GetItem: get a process */
Route.get('/inputs/:id', 'InputsController.GetItem'); 
/** @desc CreateItem: create a process */
Route.post('/inputs', 'InputsController.CreateItem');
/** @desc CreateItem: update a process */
Route.patch('/inputs/:id', 'InputsController.UpdateItem'); 
/** @desc DeleteItem: Deletes a process */
Route.delete('/inputs/:id', 'InputsController.DeleteItem');
