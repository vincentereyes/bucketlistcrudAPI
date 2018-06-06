import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient){
  	// this.getTasks();
  	// this.getTask("5ace7cd481f86af24a6360a6")
  	// this.getPokemon()
  }

  getTasks(){
    // our http response is an Observable, store it in a variable
    // let tempObservable = this._http.get('/tasks');
    // // subscribe to the Observable and provide the code we would like to do with our data from the response
    // tempObservable.subscribe(data => console.log("Got our tasks!", data));
    return this._http.get('/tasks')
 }
 getTask(id){
 	// console.log("ASDASD")
 	// let tempObservable = this._http.get('/' + id);
 	// tempObservable.subscribe(data => {
 	// 	return data
 	// });
    return this._http.get('/tasks/' + id)

 }
    addTask(newtask){
        console.log(newtask)
        return this._http.post('/tasks', newtask)
    }
    deleteTask(task){
        console.log(task)
        return this._http.delete('/tasks/' + task._id)
    }
saveTask(task){
    return this._http.put('/tasks/' + task._id, task)
}
}
