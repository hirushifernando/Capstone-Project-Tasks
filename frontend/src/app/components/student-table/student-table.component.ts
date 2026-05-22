import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { faTrash, faPlus, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { AppServiceService } from '../../app-service.service';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent implements OnInit {

  faTrash = faTrash;
  faPlus = faPlus;
  faPenSquare = faPenSquare;

  studentData: any[] = [];
  allStudentData: any[] = [];  

  selected: any;

  constructor(
    private service: AppServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getStudentData();
  }

  addNewStudent() {
    this.router.navigate(['addStudent']);
  }

  editStudent(id: any) {
    const navigationExtras: NavigationExtras = {
      state: {
        id: id
      }
    };
    this.router.navigate(['editStudent'], navigationExtras);
  }

  
  getStudentData() {
    this.service.getStudentData().subscribe(
      (response: any) => {

        this.studentData = response;
        this.allStudentData = response; 

      },
      (error) => {
        console.log('ERROR - ', error);
      }
    );
  }

  deleteStudent(itemid: any) {
    const student = {
      id: itemid
    };

    this.service.deleteStudent(student).subscribe(() => {
      this.getStudentData();
    });
  }

  
  search(value: string) {

    if (!value || value.trim().length === 0) {
      this.studentData = this.allStudentData;
      return;
    }

    const searchValue = value.toLowerCase();

    this.studentData = this.allStudentData.filter((student: any) =>
      student.name.toLowerCase().includes(searchValue)
    );
  }
}