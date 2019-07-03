import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TreeNode} from "../../models/tree-node";

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {
  @Input() ItemGroup: TreeNode[] = [];
  @Output() selected = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  nodeSelect($event: any) {
    if($event['node']['selectable']===1){
      this.selected.emit($event['node'])
    }
  }

}
