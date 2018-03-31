/** @desc
  Method names according to the Google Cloud API Naming Conventions https://cloud.google.com/apis/design/naming_convention
*/
const Route = use('Route');
// VIEWS
/** @desc AdminView: manage parameters */
Route.get('/parameters/admin', 'ParametersController.AdminView')
/** @desc DetailView: Show details of a parameter */
Route.get('/parameters/detail/:id', 'ParametersController.DetailView')
/** @desc CreateView: Create a parameter */
Route.get('/parameters/create', 'ParametersController.CreateView')
/** @desc UpdateView: Update a parameter */
Route.get('/parameters/update/:id', 'ParametersController.UpdateView')
// API
/** @desc GetList: get a list of parameters */
Route.get('/parameters', 'ParametersController.GetList');
/** @desc GetItem: get a parameter */
Route.get('/parameters/:id', 'ParametersController.GetItem'); 
/** @desc CreateItem: create a parameter */
Route.post('/parameters', 'ParametersController.CreateItem');
/** @desc UpdateItem: update a parameter */
Route.post('/parameters/:id', 'ParametersController.UpdateItem'); 
/** @desc DeleteItem: Deletes a parameter */
Route.delete('/parameters/:id', 'ParametersController.DeleteItem');
