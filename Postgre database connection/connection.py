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
#cursor.execute('''CREATE TABLE Classmates(NAME TEXT PRIMARY KEY NOT NULL, #Create table with one primary key for searching
#										  AGE INT NOT NULL,
#										  GENDER TEXT NOT NULL)''')
#print("create successfully")

#cursor.execute("INSERT INTO Classmates (NAME,AGE,GENDER)VALUES('Jesscia',50,'FEMALE')") #insert data
#print("Insert successfully")
cursor,connection=cursorConnection()

cursor.execute("SELECT * FROM Classmates WHERE AGE >= 20") #search data

sql="SELECT * FROM Classmates WHERE NAME='%s'"%("JACK")
cursor.execute(sql)
arr=cursor.fetchall()

sql="UPDATE Classmates SET NAME='Jack' WHERE NAME= 'JACK'"
cursor.execute(sql)
sql="SELECT * FROM Classmates WHERE NAME='%s'"%("Jack")
cursor.execute(sql)
arr=cursor.fetchall()
for i in arr:
	print(i[0],i[1],i[2])


connection.commit()
cursor.close()