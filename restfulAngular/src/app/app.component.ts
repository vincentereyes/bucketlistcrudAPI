import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({ 
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    newTask = { title: ""};
    tasks = [];
   task = { title: ""};
   showEdit = false;
   errors = [];
   constructor(private _httpService: HttpService){}

   ngOnInit(){
   	this.newTask = { title: ""}
    this.getTasksFromService()
   }

   
 //   onButtonClick(): void { 
 //    this.getTasksFromService();
	// }

	onButtonClickParam(id: String): void { 

    this.getTaskById(id)
	}
  deleteTask(task){
    let observable = this._httpService.deleteTask(task);
    observable.subscribe(data => {
      this.getTasksFromService()
    })
  }
   getTasksFromService(){
    console.log("RAN")
   	let observable = this._httpService.getTasks();
    observable.subscribe(data => {
    	console.log("Got our tasks!", data["data"]);
    	this.tasks = data["data"];
    })
   }
   getTaskById(id){
   	let observable = this._httpService.getTasks();
    observable.subscribe(data => {
    	id -= 1;
    	this.task = data["data"][id];
    })
   }
    onSubmit() {
      this.errors = [];
    let observable = this._httpService.addTask(this.newTask);
    observable.subscribe(data => {
      if ((data as any).message == "Error"){
        if (data["error"]["title"]["message"]){
          this.errors.push(data["error"]["title"]["message"])
        }
      }
      this.newTask = { title: ""}
      this.getTasksFromService()
    })
    // Code to send off the form data (this.newTask) to the Servicecopy
    // ...
    // Reset this.newTask to a new, clean object.
    
  }
  editTask(task){
    console.log(task._id)
    let observable = this._httpService.getTask(task._id);
    observable.subscribe(data => {
      if((data as any).message == "success") {
        this.task = (data as any).data
        this.showEdit = true
      } else {
        this.task = undefined
      }
    })
  }
  saveTask() {
    this.errors = []
    if (this.task.title == "") {
      this.errors.push("Title cannot be empty")
    } else {
      let observable = this._httpService.saveTask(this.task);
      observable.subscribe(data => {
      this.getTasksFromService()
      })
    this.task = { title: ""}
    this.getTasksFromService()
    this.showEdit = false
    }
    
  }
 }
