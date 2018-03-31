/** @desc
  Method names according to the Google Cloud API Naming Conventions https://cloud.google.com/apis/design/naming_convention
*/
const Route = use('Route');
// VIEWS
/** @desc AdminView: manage neighbors */
Route.get('/neighbors/admin', 'NeighborsController.AdminView')
/** @desc DetailView: Show details of a neighbor */
Route.get('/neighbors/detail/:id', 'NeighborsController.DetailView')
/** @desc CreateView: Create a neighbor */
Route.get('/neighbors/create', 'NeighborsController.CreateView')
/** @desc UpdateView: Update a neighbor */
Route.get('/neighbors/update/:id', 'NeighborsController.UpdateView')
// API
/** @desc GetList: get a list of neighbors */
Route.get('/neighbors', 'NeighborsController.GetList');
/** @desc GetItem: get a neighbor */
Route.get('/neighbors/:id', 'NeighborsController.GetItem'); 
/** @desc CreateItem: create a neighbor */
Route.post('/neighbors', 'NeighborsController.CreateItem');
/** @desc UpdateItem: update a neighbor */
Route.post('/neighbors/:id', 'NeighborsController.UpdateItem'); 
/** @desc DeleteItem: Deletes a neighbor */
Route.delete('/neighbors/:id', 'NeighborsController.DeleteItem');
