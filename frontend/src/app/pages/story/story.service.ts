import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Story } from "src/app/types/story";

@Injectable({providedIn:'root'})
export class StoryService{
    constructor(private http:HttpClient){
    }

    createStory(title:string, description:string){
        return this.http
            .post<Story>('/api/stories', {title, description})
    }

    viewStories(userId=""){
        let url:string ='stories';
        if(userId.length>0){
            url=`users/${userId}/stories`;
        }
        return this.http
            .get<Story[]>(`/api/${url}`);
    }

    editStory(id:string, title:string, description:string){
        return this.http
            .put<Story>(`/api/stories/${id}`, {title, description});
    }

    viewStory(id:string){
        return this.http
            .get<Story>(`/api/stories/${id}`);
    }
}