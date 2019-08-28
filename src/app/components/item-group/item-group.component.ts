import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TreeNode} from "../../models/tree-node";
import {OperationsService} from "../../services/operations/operations.service";

@Component({
  selector: 'app-item-group',
  templateUrl: './item-group.component.html',
  styleUrls: ['./item-group.component.scss']
})
export class ItemGroupComponent implements OnInit {
  ItemGroup: TreeNode[] = [];
  @Output() onSelect = new EventEmitter();

  constructor(private operation: OperationsService) { }

  ngOnInit() {
    this.operation.getItemGroup()
      .then((response) => {
        this.ItemGroup = response['data'];
      })
      .catch();
  }

  nodeSelect($event: any) {
    this.onSelect.emit($event['node']['data'])
  }

  nodeUnselect($event: any) {

  }
}
