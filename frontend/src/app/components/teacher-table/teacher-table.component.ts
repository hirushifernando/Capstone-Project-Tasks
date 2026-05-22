import { Router, NavigationExtras } from '@angular/router';
import { faTrash, faPlus, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { AppServiceService } from '../../app-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher-table',
  templateUrl: './teacher-table.component.html',
  styleUrls: ['./teacher-table.component.css']
})
export class TeacherTableComponent implements OnInit {

  faTrash = faTrash;
  faPlus = faPlus;
  faPenSquare = faPenSquare;

  teacherData: any[] = [];
  allTeacherData: any[] = [];   

  selected: any;

  constructor(
    private service: AppServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getTeacherData();
  }

  addNewTeacher() {
    this.router.navigate(['addTeacher']);
  }

  editTeacher(id: any) {
    const navigationExtras: NavigationExtras = {
      state: { id: id }
    };
    this.router.navigate(['editTeacher'], navigationExtras);
  }

  initializeDB() {
    this.service.initializeDB().subscribe(
      () => console.log('DB is Initialized'),
      (error) => console.log('ERROR - ', error)
    );
  }


  getTeacherData() {
    this.selected = 'Teachers';

    this.service.getTeacherData().subscribe(
      (response: any) => {


        this.teacherData = response;
        this.allTeacherData = response; 

      },
      (error) => {
        console.log('ERROR - ', error);
      }
    );
  }

  getStudentData() {
    this.selected = 'Students';

    this.service.getStudentData().subscribe(
      (response: any) => {

        this.teacherData = response;
        this.allTeacherData = response; 

      },
      (error) => {
        console.log('ERROR - ', error);
      }
    );
  }

  search(value: string) {

    if (!value || value.trim().length === 0) {
      this.teacherData = this.allTeacherData;
      return;
    }

    const searchValue = value.toLowerCase();

    this.teacherData = this.allTeacherData.filter((teacher: any) =>
      teacher.name.toLowerCase().includes(searchValue)
    );
  }

  deleteTeacher(itemid: any) {
    const test = { id: itemid };

    this.service.deleteTeacher(test).subscribe(() => {
      this.getTeacherData();
    });
  }
}