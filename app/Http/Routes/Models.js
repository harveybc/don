/** @desc
  Method names according to the Google Cloud API Naming Conventions https://cloud.google.com/apis/design/naming_convention
*/
const Route = use('Route');
// VIEWS
/** @desc AdminView: manage models */
Route.get('/models/admin', 'ModelsController.AdminView')
/** @desc DetailView: Show details of a model */
Route.get('/models/detail/:id', 'ModelsController.DetailView')
/** @desc CreateView: Create a model */
Route.get('/models/create', 'ModelsController.CreateView')
/** @desc UpdateView: Update a model */
Route.get('/models/update/:id', 'ModelsController.UpdateView')
// API
/** @desc GetList: get a list of models */
Route.get('/models', 'ModelsController.GetList');
/** @desc GetItem: get a model */
Route.get('/models/:id', 'ModelsController.GetItem'); 
/** @desc CreateItem: create a model */
Route.post('/models', 'ModelsController.CreateItem');
/** @desc UpdateItem: update a model */
Route.post('/models/:id', 'ModelsController.UpdateItem'); 
/** @desc DeleteItem: Deletes a model */
Route.delete('/models/:id', 'ModelsController.DeleteItem');
