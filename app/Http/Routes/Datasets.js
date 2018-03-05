/** @desc
  Method names according to the Google Cloud API Naming Conventions https://cloud.google.com/apis/design/naming_convention
*/
const Route = use('Route');
// VIEWS
Route.get('/datasets/admin', 'DatasetsController.AdminView')
/** @desc AdminView: Deletes a process */
Route.get('/datasets/detail/:id', 'DatasetsController.DetailView')
/** @desc AdminView: Deletes a process */
Route.get('/datasets/create', 'DatasetsController.CreateView')
/** @desc AdminView: Deletes a process */
Route.get('/datasets/update/:id', 'DatasetsController.UpdateView')
// ACCOUNTING COLLECTION MANAGEMENT:
/** @desc GetList: get a list of datasets */
Route.get('/datasets', 'DatasetsController.GetList');
/** @desc GetItem: get a process */
Route.get('/datasets/:id', 'DatasetsController.GetItem'); 
/** @desc CreateItem: create a process */
Route.post('/datasets', 'DatasetsController.CreateItem');
/** @desc CreateItem: update a process */
Route.patch('/datasets/:id', 'DatasetsController.UpdateItem'); 
/** @desc DeleteItem: Deletes a process */
Route.delete('/datasets/:id', 'DatasetsController.DeleteItem');
