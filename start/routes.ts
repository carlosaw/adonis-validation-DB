import Route from '@ioc:Adonis/Core/Route'

Route.post('/', async () => {
  return { hello: 'world' }
})

Route.post('/string', 'StringsController.validateString');
Route.post('/string/rules', 'StringsController.validateStringWithRules');
Route.post('/string/database', 'StringsController.validateStringWithDatabase');
Route.post('/string/equals', 'StringsController.validateStringWithEquals');
Route.post('/enum/validateEnum', 'EnumsController.validateEnum');
Route.post('/number/validateNumber', 'NumbersController.validateNumber');
Route.post('/boolean/validateBoolean', 'BooleansController.validateBoolean');
Route.post('/date/validateDate', 'DatesController.validateDates');
Route.post('/object/validateObject', 'ObjectsController.validateObject');
Route.post('/object/showObjectRequest', 'ObjectsController.showObjectRequest');
Route.post('/array/validateArray', 'ArraysController.validateArray');

Route.post('/n1/validateN1', 'ExercisesController.validateN1');
Route.post('/n2/validateN2', 'ExercisesController.validateN2');
Route.post('/n3/validateN3', 'ExercisesController.validateN3');