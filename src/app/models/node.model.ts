import {Deserializable} from "./deserializable.model";

/*
export class Node {
    hostname: string;
    uuid: string;
    health: Health;
    systemInfo: SysInfo;

    
    constructor(health: Health, systemInfo: SysInfo) {
        this.health= health;
        this.systemInfo = systemInfo;
	} 
}
*/

export class Health implements Deserializable {
    uptime: number;
    healthy: boolean;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}

export class SysInfo implements Deserializable {
    cpu: string;
    numCores: number;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}

export class Node implements Deserializable {
    /*hostname: string;
    uuid: string;
    health: Health;
    systemInfo: SysInfo;*/
    constructor(public hostname: string, public uuid: number, public health:Health,public systemInfo: SysInfo) {}

  deserialize(input: any) {
    Object.assign(this, input);
    this.health = new Health().deserialize(input.health);
    this.systemInfo = new SysInfo().deserialize(input.systemInfo);
    return this;
  }
}