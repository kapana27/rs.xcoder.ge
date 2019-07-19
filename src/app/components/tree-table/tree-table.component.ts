import { Component, OnInit } from '@angular/core';
import {TreeNode} from "primeng/api";

@Component({
  selector: 'app-tree-table',
  templateUrl: './tree-table.component.html',
  styleUrls: ['./tree-table.component.scss']
})
export class TreeTableComponent implements OnInit {
  files4: TreeNode[];
  cols: any[];

  constructor() { }

  ngOnInit() {

    this.files4 = [
      {
        "data": {
          "id": 4,
          "name": "მიწის ნაკვეთები "
        },
        "children": [
          {
            "data": {
              "id": 5,
              "name": "მიწის ნაკვეთი 2"
            },
            "children": [
              {
                "data": {
                  "id": 19,
                  "name": "12313"
                }
              }
            ]
          }
        ]
      },
      {
        "data": {
          "id": 12,
          "name": "2172 - დეკორატიული "
        }
      },
      {
        "data": {
          "id": 37,
          "name": "adasd"
        }
      },
      {
        "data": {
          "id": 36,
          "name": "1312"
        }
      },
      {
        "data": {
          "id": 35,
          "name": "ddd"
        }
      },
      {
        "data": {
          "id": 30,
          "name": "ძველი ინვენტარი"
        }
      },
      {
        "data": {
          "id": 28,
          "name": "ტესტ"
        }
      },
      {
        "data": {
          "id": 17,
          "name": "არამატერიალური"
        }
      },
      {
        "data": {
          "id": 9,
          "name": "2150 - მანქანა-დანადგარები"
        },
        "children": [
          {
            "data": {
              "id": 23,
              "name": "asdasd"
            }
          },
          {
            "data": {
              "id": 22,
              "name": "test"
            }
          }
        ]
      },
      {
        "data": {
          "id": 10,
          "name": "2160 - ტექნიკა"
        },
        "children": [
          {
            "data": {
              "id": 2,
              "name": "კომპიუტერული ტექნიკა"
            }
          },
          {
            "data": {
              "id": 3,
              "name": "ელ. ტექნიკა"
            }
          }
        ]
      },
      {
        "data": {
          "id": 11,
          "name": "2170 - ავეჯი"
        }
      },
      {
        "data": {
          "id": 38,
          "name": "ლაშა"
        }
      },
      {
        "data": {
          "id": 14,
          "name": "2180 - ავტომობილები და სპეც. ტექნიკა"
        }
      },
      {
        "data": {
          "id": 15,
          "name": "სახარჯი ინვენტარი"
        },
        "children": [
          {
            "data": {
              "id": 20,
              "name": "ტესტ"
            }
          }
        ]
      }
    ]
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'id', header: 'id' },
    ];
  }
  nodeSelect(event) {
    console.log(event);
  }
}
