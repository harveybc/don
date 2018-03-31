/** @desc
  Method names according to the Google Cloud API Naming Conventions https://cloud.google.com/apis/design/naming_convention
*/
const Route = use('Route');
// VIEWS
/** @desc AdminView: manage evaluations */
Route.get('/evaluations/admin', 'EvaluationsController.AdminView')
/** @desc DetailView: Show details of a evaluation */
Route.get('/evaluations/detail/:id', 'EvaluationsController.DetailView')
/** @desc CreateView: Create a evaluation */
Route.get('/evaluations/create', 'EvaluationsController.CreateView')
/** @desc UpdateView: Update a evaluation */
Route.get('/evaluations/update/:id', 'EvaluationsController.UpdateView')
// API
/** @desc GetList: get a list of evaluations */
Route.get('/evaluations', 'EvaluationsController.GetList');
/** @desc GetItem: get a evaluation */
Route.get('/evaluations/:id', 'EvaluationsController.GetItem'); 
/** @desc CreateItem: create a evaluation */
Route.post('/evaluations', 'EvaluationsController.CreateItem');
/** @desc UpdateItem: update a evaluation */
Route.post('/evaluations/:id', 'EvaluationsController.UpdateItem'); 
/** @desc DeleteItem: Deletes a evaluation */
Route.delete('/evaluations/:id', 'EvaluationsController.DeleteItem');
