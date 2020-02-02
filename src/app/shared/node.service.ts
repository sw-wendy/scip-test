import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Node } from '../models/node.model';

@Injectable({
  providedIn: 'root'
})
export class NodeService {
  constructor(public http: HttpClient) { }

  /*
  getNodes(): Observable<Node[]> {
    return this.http.get('/api/node');
  }
  getNodes() {
    return this.http.get('/api/node').subscribe(...)
  }
  getNodes(uuid:number): Observable<Node> {
    return this.http.get('/api/node/'+uuid);//.map(res => res.json());
  }

*/
  public getNodes() {
    return this.http.get<Node[]>(`${environment.baseUrl}/node`);
    //return this.http.get<Node[]>('/api/node');
  }

  public getNode(uuid: number) {
    return this.http.get<Node>('/api/node/' + uuid);
    //return this.http.get('/api/node/' + uuid);
  }

  createNode(node: Node) {
    return this.http.post('/api/node',
       {
    uuid: node.uuid,
    hostname: node.hostname,
    health: node.health,
    system_info: node.systemInfo
       }
    );
  } 
}
/*
export class Node {
  constructor(public hostname: string, public uuid: number, public health:{},public system_info:{}) {

  }
 // public hostname: string;
  //public uuid: number;
}*/

