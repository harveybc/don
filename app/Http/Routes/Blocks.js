/** @desc
  Method names according to the Google Cloud API Naming Conventions https://cloud.google.com/apis/design/naming_convention
*/
const Route = use('Route');
// VIEWS
Route.get('/blocks/admin', 'BlocksController.AdminView')
/** @desc AdminView: Deletes a process */
Route.get('/blocks/detail/:id', 'BlocksController.DetailView')
/** @desc AdminView: Deletes a process */
Route.get('/blocks/create', 'BlocksController.CreateView')
/** @desc AdminView: Deletes a process */
Route.get('/blocks/update/:id', 'BlocksController.UpdateView')
// ACCOUNTING COLLECTION MANAGEMENT:
/** @desc GetList: get a list of blocks */
Route.get('/blocks', 'BlocksController.GetList');
/** @desc GetItem: get a process */
Route.get('/blocks/:id', 'BlocksController.GetItem'); 
/** @desc CreateItem: create a process */
Route.post('/blocks', 'BlocksController.CreateItem');
/** @desc CreateItem: update a process */
Route.patch('/blocks/:id', 'BlocksController.UpdateItem'); 
/** @desc DeleteItem: Deletes a process */
Route.delete('/blocks/:id', 'BlocksController.DeleteItem');
