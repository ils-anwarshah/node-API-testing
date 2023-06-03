const createTableQuery ='CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT unique not null, password not null)';
const loginUserQuery = 'SELECT * FROM Users WHERE username = ? AND password = ?'
const registerUserQuery = "INSERT INTO Users(username, password) VALUES(? , ? )"
const UpdateUserQuery = "UPDATE Users SET password=? WHERE username= ?"
const fetchUserQuery  = 'SELECT * FROM Users'
const deleteUserQuery = 'DELETE FROM Users WHERE username=?'

module.exports= {createTableQuery,loginUserQuery,registerUserQuery,UpdateUserQuery,fetchUserQuery,deleteUserQuery}