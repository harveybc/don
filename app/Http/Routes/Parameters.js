/** @desc
  Method names according to the Google Cloud API Naming Conventions https://cloud.google.com/apis/design/naming_convention
*/
const Route = use('Route');
// VIEWS
Route.get('/parameters/admin', 'ParametersController.AdminView')
/** @desc AdminView: Deletes a process */
Route.get('/parameters/detail/:id', 'ParametersController.DetailView')
/** @desc AdminView: Deletes a process */
Route.get('/parameters/create', 'ParametersController.CreateView')
/** @desc AdminView: Deletes a process */
Route.get('/parameters/update/:id', 'ParametersController.UpdateView')
// ACCOUNTING COLLECTION MANAGEMENT:
/** @desc GetList: get a list of parameters */
Route.get('/parameters', 'ParametersController.GetList');
/** @desc GetItem: get a process */
Route.get('/parameters/:id', 'ParametersController.GetItem'); 
/** @desc CreateItem: create a process */
Route.post('/parameters', 'ParametersController.CreateItem');
/** @desc CreateItem: update a process */
Route.patch('/parameters/:id', 'ParametersController.UpdateItem'); 
/** @desc DeleteItem: Deletes a process */
Route.delete('/parameters/:id', 'ParametersController.DeleteItem');
