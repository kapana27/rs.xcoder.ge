import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit,OnChanges {
  lang: string = localStorage.getItem("lang");
  @Output() onChange = new EventEmitter();
  @Input() changer: any;

  constructor() {
    if(!this.notNull(this.lang)){
      localStorage.setItem("lang","uk");
      this.lang=localStorage.getItem("lang");
    }
  }
  ngOnInit() {
  }
  changeLang(lang: string) {
    localStorage.setItem("lang",lang);
    this.lang=localStorage.getItem("lang");
    this.onChange.emit(lang)
  }
  notNull(value) {
    return (value !== undefined && value !== null && value.trim() != '');
  }

  ngOnChanges(changes): void {
    console.log(changes)
      this.changeLang(localStorage.getItem("lang"));
  }

}
