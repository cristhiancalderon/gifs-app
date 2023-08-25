import { Component, Injectable } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private gifsService:GifsService){};

  get tags(){
    return this.gifsService.tagHistory;
  }

  public searchTags(tag:string){
    return this.gifsService.searchTag(tag);
  }



}
