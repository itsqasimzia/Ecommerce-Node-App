Authentication And Basic Crud Application With Mongoose JWT ExpressJS

Write APIs to perform operations on the table todo, with the following columns,

Todo Table
```
Columen   Type
id	Objectid
task	 String
image	String
users	Array
TimeStamp true

```
Replace the Envoirenment Variables With Your Own.


Possible values for priority are USER, ADMIN, and GUEST.
User Should Create Account Through Registration Form.
After Login JWT Tokens Are Assigned To The User Which Will Have Short Live After The WIll Expires and user have to login again (For Testing Purpose)
ACCESS_TOKEN && Refresh Token 
The user may request and perform Create, Read, Update operations on the database.


###Invalid scenarios for all APIs

#Invalid Status

**Response**
Status code
401
Un-Authorized
Access Token Not Attached With Request

**Response**
Status code
400
Invalid or Empty Fields

**Response**
Status code
201
After Success 




Use npm install to install the packages.
** server port : 8000 **

Export the express instance using the default export syntax.

Use Common JS module syntax.
