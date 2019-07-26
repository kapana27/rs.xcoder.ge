import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TreeNode} from "../../models/tree-node";
import {RequestService} from "../../services/request.service";

@Component({
  selector: 'app-table-tree',
  templateUrl: './table-tree.component.html',
  styleUrls: ['./table-tree.component.scss']
})
export class TableTreeComponent implements OnInit {
  @Input() ItemGroup: TreeNode[] = [];
  @Output() selected = new EventEmitter();
  @Input() enableActions: boolean = true;
  @Input() cols: any[] = [];

  @Input() actions: {
    get?: string;
    insert?: string;
    update?: string;
    delete?: string;
  };
  constructor(private Request: RequestService) { }

  ngOnInit() {
    if(this.notNull(this.actions.get)){
      this.Request.Get(this.actions.get)
        .then(response=>{
          console.log(response);
          this.ItemGroup  = response['data']
        }).catch(()=>{
        this.ItemGroup = [];
      });
    }
  }
  nodeSelect($event: any) {
    this.selected.emit($event['node'])
  }
  private notNull(value) {
    return (value !== undefined && value !== null && value !=='');
  }

}
