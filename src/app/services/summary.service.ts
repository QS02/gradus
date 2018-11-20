import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class SummaryService {

  url = "https://safety-b379.restdb.io"
  myHeaders = new HttpHeaders().set('x-apikey', '5bae9c02bd79880aab0a781f').set('Content-type', 'application/json');
  public event = {
    tools: new EventEmitter(),
    equipment: new EventEmitter(),
    activity: new EventEmitter(),
    activityCrew: new EventEmitter(),
  };
  constructor(private http: HttpClient) { }

  getStatools(){
    return this.http.get(this.url + `/rest/statools`, {headers:this.myHeaders})
  }
  
  getEquipment(){
    return this.http.get(this.url + `/rest/sta-equipment`, {headers:this.myHeaders})
  }

  getStatoolsList(){
    return this.http.get(this.url + `/rest/statools`, {headers:this.myHeaders})
  }
  
  getEquipmentList(){
    return this.http.get(this.url + `/rest/sta-equipment`, {headers:this.myHeaders})
  }

  getActivity(){
    return this.http.get(this.url + `/rest/jsaactivity`, {headers:this.myHeaders})
  }

  getActivityCrew(){
    return this.http.get(this.url + `/rest/crew-mock`, {headers:this.myHeaders})
  }

  getCriticalOperations (){
    return this.http.get(this.url + `/rest/life-critical-operations`, {headers:this.myHeaders})
  }

}

