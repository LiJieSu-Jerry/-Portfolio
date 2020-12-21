import psycopg2
import pandas as pd

def cursorConnection():
	connection=psycopg2.connect(
		host='rds-postgresql-10mintutorial.cdqzr867nbt9.us-east-2.rds.amazonaws.com',
		port="5432",
		user='masterUsername',
		password='opwinopwin',
		database='myDatabase'
		)
	cursor=connection.cursor()
	print("Connect successfully")
	return cursor,connection
def searchByName(cursor,name):
	sql="SELECT * FROM Classmates WHERE name==%s" % (name)
	cursor.execute()

#cursor.execute('''CREATE TABLE Classmates(NAME TEXT PRIMARY KEY NOT NULL, #Create table with one primary key for searching
#										  AGE INT NOT NULL,
#										  GENDER TEXT NOT NULL)''')
#print("create successfully")

#cursor.execute("INSERT INTO Classmates (NAME,AGE,GENDER)VALUES('Jesscia',50,'FEMALE')") #insert data
#print("Insert successfully")
cursor,connection=cursorConnection()
cursor.execute("SELECT * FROM Classmates WHERE AGE >= 20") #search data
arr=cursor.fetchall()

for i in arr:
	print(i[0],i[1],i[2])
search_byName

connection.commit()
cursor.close()