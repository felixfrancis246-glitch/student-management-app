from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

# Data Model
class Student(BaseModel):
    id: int
    name: str
    department: str

# In-memory database
students = []

# Home API
@app.get("/")
def home():
    return {"message": "Welcome to Student Microservice"}

# CREATE
@app.post("/students")
def add_student(student: Student):
    students.append(student)
    return {"message": "Student Added Successfully"}

# READ ALL
@app.get("/students")
def get_students():
    return students

# READ BY ID
@app.get("/students/{student_id}")
def get_student(student_id: int):
    for student in students:
        if student.id == student_id:
            return student
    raise HTTPException(status_code=404, detail="Student Not Found")

# UPDATE
@app.put("/students/{student_id}")
def update_student(student_id: int, updated_student: Student):
    for index, student in enumerate(students):
        if student.id == student_id:
            students[index] = updated_student
            return {"message": "Student Updated Successfully"}
    raise HTTPException(status_code=404, detail="Student Not Found")

# DELETE
@app.delete("/students/{student_id}")
def delete_student(student_id: int):
    for student in students:
        if student.id == student_id:
            students.remove(student)
            return {"message": "Student Deleted Successfully"}
    raise HTTPException(status_code=404, detail="Student Not Found")
