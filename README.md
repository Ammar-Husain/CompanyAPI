This is Company Mnagement System API use Expressjs and MongoDB as database

## Documentation

### Users roles:

##### 1. Super Admin (code 2004):
Can do all CRUD operations in all users and employees, There can be just one suprAdmin the first user will be super admin automatically and he can not delete his account except he create another user and make him super admin and if make another user super admin his role will be set to Admin automatically

##### 2. Admin (code 2002):
Can do all CRUD operations in all employees and users that are not admins or the super sdmin.

##### 3. Editor (code 2000):
Can do all CRUD operations in all employees.

##### 4. User (code 1998):
Can do all CRUD operations in all employees except deleteing.


```markdown
|      Note      |
|:-------------:|
| For the fields of the user document and employee document see the User and Employee Schemas in the model directory . |
```

### Available routes:

```markdown
|      Note      |
|:-------------:|
| For all routes except the login, refresh and register (if there is no users) the user must be loggedin and the authorization header must contain the jwt access token. |
```

#### /users routes:

1. /users/login POST: request body must contain username and password and the response will contain the access jwt token and the user document and the refrsh jwt token will be added to the user document and to the cookie 'jwt'.

Example:

```javascript
let currentUser
const credentials = { username: 'user1', password: 'password' }
const body = JSON.stringify(credentials)

fetch('https://company-managing-api.onrender.com/users/login', {
	method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'include',
		body
})
.then(response => respnse.json())
.then(data => {
		console.log(data)
		currentUser = data.user
	})
```

2. /users/register POST: request body must contain the username, password, role (if not specified it will be 'User'), phone unmber and email of the new user and the response will contain the document of the added user.

Example:

```javascript
const newUser = {
	username: 'user1',
	password: 'password',
	roles: {
		User: 1998,
		Editor: 2000,
		Admin: 2002
	},
	email: 'user1@gmail.com',
	phoneNumber: '+249100000000'
}

const body = JSON.stringify(newUser)
fetch('https://company-managing-api.onrender.com/users/register', {
	method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			authorization: currentUser.accessToken
		},
		credentials: 'include',
		body
})
.then(response => respnse.json())
.then(data => console.log(data))
```

3. /users/refresh GET: check the cookies and if there is a valid refresh token a new access token will be send in the response

Example:

```javascript
fetch('https://company-managing-api.onrender.com/users/refresh', {
	method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'include',
})
.then(response => respnse.json())
.then(data => {
		console.log(data)
		currentUser.accessToken = data.accessToken
	})
```

4. /users/ GET: the response will contain a list of all users documents from the database.

Example:

```javascript
fetch('https://company-managing-api.onrender.com/users/', {
	method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			authorization: currentUser.accessToken
		},
		credentials: 'include'
})
.then(response => respnse.json())
.then(data => console.log(data))
```
5. /users/:id GET: the response will contain the document of the user that have the specified id.

Example:

```javascript
fetch('https://company-managing-api.onrender.com/users/3487384', {
	method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			authorization: currentUser.accessToken
		},
		credentials: 'include'
})
.then(response => respnse.json())
.then(data => console.log(data))
```

6. /users/update/:id PUT or users/:id PUT: request body must contain the fields to update  and the response will contain the updated document of the updated user.

Example:

```javascript
const updatedFields = { username: 'user2'}
const body = JSON.stringify(updatedFields)
fetch('https://company-managing-api.onrender.com/users/7436563', {
	method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			authorization: currentUser.accessToken
		},
		credentials: 'include',
		body
})
.then(response => respnse.json())
.then(data => console.log(data))
```

7. /users/update PUT or /users PUT: the same the above route but the id of the user to update must be specified in the request body.

Example:

```javascript
const updatedUser = { id: 7436563, username: 'user2'}
const body = JSON.stringify(updatedUser)

fetch('https://company-managing-api.onrender.com/users/', {
	method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			authorization: currentUser.accessToken
		},
		credentials: 'include',
		body
})
.then(response => respnse.json())
.then(data => console.log(data))
```

8. /users/delete/:id DELETE or users/:id DELETE: the response will contain the document of the deleted user.

Example:

```javascript
fetch('https://company-managing-api.onrender.com/users/7436563', {
	method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			authorization: currentUser.accessToken
		},
		credentials: 'include',
})
.then(response => respnse.json())
.then(data => console.log(data))
```

9. /users/delete DELETE or /users/ DELETE: the same as the route above but the request body must contain the id of the user to delete.

Example:

```javascript
const userToDelete = { id: 7436563 }
const body = JSON.stringify(userToDelete)
fetch('https://company-managing-api.onrender.com/users/', {
	method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			authorization: currentUser.accessToken
		},
		credentials: 'include',
		body
})
.then(response => respnse.json())
.then(data => console.log(data))
```

#### /employees routes:

1. /employess GET: the response will contain a list of all employees documents in the database.

Example:

```javascript
fetch('https://company-managing-api.onrender.com/employees/', {
	method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			authorization: currentUser.accessToken
		},
		credentials: 'include',
})
.then(response => respnse.json())
.then(data => console.log(data))
```

2. /employees/:id GET: the response will contain the document of the employee with specified id.

Example:

```javascript
fetch('https://company-managing-api.onrender.com/employees/7436563', {
	method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			authorization: currentUser.accessToken
		},
		credentials: 'include',
})
.then(response => respnse.json())
.then(data => console.log(data))
```

3. /employess/ POST: the request body must contain the first name, last name, email, phone number, birth date of the new employee the response will contain the document of the created employee.

Example:

```javascript
const newEmployee = {
	firstname: 'John',
	lastname: 'Snow',
	email: 'john@gmail.com',
	phoneNumber: '+249100000000',
	birthDate: new Date('8/2/1990'),
	employmentStatus: 'full time' 
}

const body = JSON.stringify(newEmployee)
fetch('https://company-managing-api.onrender.com/employees/', {
	method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			authorization: currentUser.accessToken
		},
		credentials: 'include',
		body
})
.then(response => respnse.json())
.then(data => console.log(data))
```

4. /employee/:id PUT: the request body must contain the fields to update the response will contain the updated document of the updated employee.

Example:

```javascript
const updatedFields = {
	employmentStatus: 'remote' 
}

const body = JSON.stringify(updatedFields)
fetch('https://company-managing-api.onrender.com/employees/75684565', {
	method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			authorization: currentUser.accessToken
		},
		credentials: 'include',
		body
})
.then(response => respnse.json())
.then(data => console.log(data))
```

5. /employee:id PUT: the same as the route above but the employee id must be ncluded in the request body.

Example:

```javascript
const updatedEmployee = {
	id: 78547567,
	employmentStatus: 'remote' 
}

const body = JSON.stringify(updatedFields)
fetch('https://company-managing-api.onrender.com/employess', {
	method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			authorization: currentUser.accessToken
		},
		credentials: 'include',
		body
})
.then(response => respnse.json())
.then(data => console.log(data))
```
6. /employee/:id DELETE: the response will contain the document of the deleted employee.
 
 Example:
 
 ```javascript
 fetch('https://company-managing-api.onrender.com/employess/57678647', {
 	method: 'DELETE',
 		headers: {
 			'Content-Type': 'application/json',
 			authorization: currentUser.accessToken
 		},
 		credentials: 'include',
 })
 .then(response => respnse.json())
 .then(data => console.log(data))
 ```

7. /employee DELETE: the same as the route above but the request body must contain the id of the user to delete.


Example:

```javascript
const employeeToDelete= { id: 78547567 }
const body = JSON.stringify(employeeToDelete)
fetch('https://company-managing-api.onrender.com/employess', {
	method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			authorization: currentUser.accessToken
		},
		credentials: 'include',
		body
})
.then(response => respnse.json())
.then(data => console.log(data))
```