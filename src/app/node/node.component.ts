import { Component, OnInit } from '@angular/core';
import { NodeService} from '../shared/node.service';
import { interval } from 'rxjs';
import {startWith, switchMap, map} from 'rxjs/operators';
import { Node, Health, SysInfo } from '../models/node.model';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {

  nodes: Node[]= [];
  selectedNode = {};
  show_detail = false;
  add_one = false;

  constructor(public nodeService: NodeService) {
   }
   /*
     here polling data from server every 10 sec by rxjs interval is often enough to simply update things 
     on client without having to refresh or require any other interaction.
    */
   ngOnInit() {
    interval(60000)
      .pipe(
        startWith(0),
        switchMap(() => this.nodeService.getNodes())
      )
      .subscribe(res => {
        this.nodes = res;
        if(this.nodes.length >= 1) {
          this.selectedNode = this.nodes[0];
          this.show_detail = true;
        console.log(res[res.length-1].hostname);
        }
      });
  }

   /*
  ngOnInit() {
        this.nodeService.getNodes().subscribe((ret) => {
          console.log(ret);
          this.nodes = ret;
          if(this.nodes.length>=1) {
          this.selectedNode = this.nodes[0];
          this.show_detail = true;
          }
        })  
  }*/

  selNode(onode): void {
    this.selectedNode = onode;
    this.show_detail = true;
  }

  addNode(): void {
    this.add_one = true;
  }

  submit(data,fg){
    if(!fg){
      alert("Please input host name");
      return;
    }
    this.add_one = false;

    let health : Health = new Health();
    health.uptime = data.uptime;
    health.healthy = data.healthy;
    let system_info : SysInfo = new SysInfo();
    system_info.cpu = data.cpu;
    system_info.numCores = data.num_cores;
   let model: Node = new Node(data.hostname,data.uuid,health,system_info);
    model.deserialize(model);
    this.nodeService.createNode(model);
    this.nodes.push(model);
    this.selectedNode = model;
    this.show_detail = true;
  }

}


