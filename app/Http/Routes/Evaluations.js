/** @desc
  Method names according to the Google Cloud API Naming Conventions https://cloud.google.com/apis/design/naming_convention
*/
const Route = use('Route');
// VIEWS
Route.get('/evaluations/admin', 'EvaluationsController.AdminView')
/** @desc AdminView: Deletes a process */
Route.get('/evaluations/detail/:id', 'EvaluationsController.DetailView')
/** @desc AdminView: Deletes a process */
Route.get('/evaluations/create', 'EvaluationsController.CreateView')
/** @desc AdminView: Deletes a process */
Route.get('/evaluations/update/:id', 'EvaluationsController.UpdateView')
// ACCOUNTING COLLECTION MANAGEMENT:
/** @desc GetList: get a list of evaluations */
Route.get('/evaluations', 'EvaluationsController.GetList');
/** @desc GetItem: get a process */
Route.get('/evaluations/:id', 'EvaluationsController.GetItem'); 
/** @desc CreateItem: create a process */
Route.post('/evaluations', 'EvaluationsController.CreateItem');
/** @desc CreateItem: update a process */
Route.patch('/evaluations/:id', 'EvaluationsController.UpdateItem'); 
/** @desc DeleteItem: Deletes a process */
Route.delete('/evaluations/:id', 'EvaluationsController.DeleteItem');
