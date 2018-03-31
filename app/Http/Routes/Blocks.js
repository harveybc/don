/** @desc
  Method names according to the Google Cloud API Naming Conventions https://cloud.google.com/apis/design/naming_convention
*/
const Route = use('Route');
// VIEWS
/** @desc AdminView: */
Route.get('/blocks/admin', 'BlocksController.AdminView')
/** @desc DetailView: */
Route.get('/blocks/detail/:id', 'BlocksController.DetailView')
/** @desc CreateView */
Route.get('/blocks/create', 'BlocksController.CreateView')
/** @desc UpdateView: */
Route.get('/blocks/update/:id', 'BlocksController.UpdateView')
// API
/** @desc GetList: get a list of blocks */
Route.get('/blocks', 'BlocksController.GetList');
/** @desc GetItem: get a block */
Route.get('/blocks/:id', 'BlocksController.GetItem'); 
/** @desc CreateItem: create a block */
Route.post('/blocks', 'BlocksController.CreateItem');
/** @desc CreateItem: update a block */
Route.post('/blocks/:id', 'BlocksController.UpdateItem'); 
/** @desc DeleteItem: Deletes a block */
Route.delete('/blocks/:id', 'BlocksController.DeleteItem');
