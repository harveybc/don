/** @desc
  Method names according to the Google Cloud API Naming Conventions https://cloud.google.com/apis/design/naming_convention
*/
const Route = use('Route');
// VIEWS
/** @desc AdminView: manage datasets */
Route.get('/datasets/admin', 'DatasetsController.AdminView')
/** @desc DetailView: Show details of a dataset */
Route.get('/datasets/detail/:id', 'DatasetsController.DetailView')
/** @desc CreateView: Create a dataset */
Route.get('/datasets/create', 'DatasetsController.CreateView')
/** @desc UpdateView: Update a dataset */
Route.get('/datasets/update/:id', 'DatasetsController.UpdateView')
// API
/** @desc GetList: get a list of datasets */
Route.get('/datasets', 'DatasetsController.GetList');
/** @desc GetItem: get a dataset */
Route.get('/datasets/:id', 'DatasetsController.GetItem'); 
/** @desc CreateItem: create a dataset */
Route.post('/datasets', 'DatasetsController.CreateItem');
/** @desc UpdateItem: update a dataset */
Route.post('/datasets/:id', 'DatasetsController.UpdateItem'); 
/** @desc DeleteItem: Deletes a dataset */
Route.delete('/datasets/:id', 'DatasetsController.DeleteItem');
