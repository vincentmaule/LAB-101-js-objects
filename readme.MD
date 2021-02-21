Allow user to retrieve information through JSON and use object.
``` 
// 1. Retrieve the stringified object from localStorage
const stringifiedManager = window.localStorage.getItem('manager')

// 2. Convert the stringified object into a real object
const manager = JSON.parse(stringifiedManager)

// 3. Use the object normally
manager.firstName //=> 'Eva'
```