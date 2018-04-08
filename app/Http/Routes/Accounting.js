/** @desc
  Method names according to the Google Cloud API Naming Conventions https://cloud.google.com/apis/design/naming_convention
*/
const Route = use('Route');
// VIEWS
Route.get('/accounting/admin', 'AccountingController.AdminView')
/** @desc AdminView: Deletes a process */
Route.get('/accounting/detail/:id', 'AccountingController.DetailView')
/** @desc AdminView: Deletes a process */
Route.get('/accounting/create', 'AccountingController.CreateView')
/** @desc AdminView: Deletes a process */
Route.get('/accounting/update/:id', 'AccountingController.UpdateView')
// ACCOUNTING COLLECTION MANAGEMENT:
/** @desc GetList: get a list of accounting */
Route.get('/accounting', 'AccountingController.GetList');
/** @desc GetItem: get a process */
Route.get('/accounting/:id', 'AccountingController.GetItem'); 
/** @desc CreateItem: create a process */
Route.post('/accounting', 'AccountingController.CreateItem');
/** @desc CreateItem: update a process */
Route.post('/accounting/:id', 'AccountingController.UpdateItem'); 
/** @desc CreateItem: update a process */
Route.post('/flooding', 'AccountingController.Flooding'); 
/** @desc DeleteItem: Deletes a process */
Route.delete('/accounting/:id', 'AccountingController.DeleteItem');
