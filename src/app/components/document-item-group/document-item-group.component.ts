import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DocumentService} from "../../services/document/document.service";

@Component({
  selector: 'app-document-item-group',
  templateUrl: './document-item-group.component.html',
  styleUrls: ['./document-item-group.component.scss']
})
export class DocumentItemGroupComponent implements OnInit {
  @Input() dialog: boolean = false;
  @Output() onClose = new EventEmitter();
  filter: { name?: string, group?: any} = {};
  itemCatalog: any[] = [];
  selectedCatalogs: any[] = [];
  @Output() onSelected = new EventEmitter();
  constructor(private document: DocumentService) { }

  ngOnInit() {
  }

  selectItemGroup($event) {
    this.filter.group = $event['id'];
    this.itemCatalogFilter('itemCatalogByGroup');
  }

  itemCatalogFilter(type) {

    this.document.getItemCatalog(type, (this.filter.name)? this.filter.name: this.filter.group)
      .then(response => {
        this.itemCatalog = response['data'];
      })
      .catch()

  }

  save() {
     if(this.selectedCatalogs.length === 0){
        alert("არჩეული არაფერია");
     }else{
       this.onSelected.emit(this.selectedCatalogs)
     }
  }

  close() {
    this.onClose.emit(false)
  }
}
