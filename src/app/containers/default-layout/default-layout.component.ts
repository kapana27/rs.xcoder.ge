import {Component, OnDestroy, Inject, OnInit} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../_nav';
import{ ChangeDetectorRef } from '@angular/core';
import {LgService} from "../../services/lg.service";
import {MenuService} from "../../services/menu.service";


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styles:[
     ` 
     
      /deep/ .inv_lang button {
        background: none;
        border:none;
        opacity: 0.5;
      }
    
     
      .inv_lang button.active {
         opacity: 1;
         background: #007ad9;
         border-radius: 25%;
       }
     
    `
  ]
})
export class DefaultLayoutComponent implements OnInit, OnDestroy {

  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  lang: string;
  changer: any = '';
  // @ts-ignore
  constructor(@Inject(DOCUMENT) _document?: any, public lgService: LgService, public menuService: MenuService) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }


  ngOnDestroy(): void {
    this.changes.disconnect();
  }

  notNull(value) {
    return (value !== undefined && value !== null && value.trim() != '');
  }

  ngOnInit(): void {
  }

  onChange($event: any) {
    this.lgService.changeLanguage($event);
      this.lang = $event;
  }

  clickMenu($event: MouseEvent) {
    console.log($event)
  }
}

