import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Subscription, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Story } from "src/app/types/story";

@Injectable({providedIn:'root'})
export class StoryService implements OnDestroy{
    private story$$ = new BehaviorSubject<Story|undefined>(undefined);
    private story$ = this.story$$.asObservable();

    story: Story|undefined;
    STORY_KEY = '[story]';

    storySubscription: Subscription;

    constructor(private http:HttpClient){
        this.storySubscription = this.story$.subscribe((story)=>this.story = story);
    }

    createStory(title:string, description:string, creator:string){
        return this.http
            .post<Story>('/api/stories', {title, description, creator})
            .pipe(tap((story)=>this.story$$.next(story)));
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
            .put<Story>(`/api/stories/${id}`, {title, description})
            .pipe(tap((story)=>this.story$$.next(story)));
    }

    viewStory(id:string){
        return this.http
            .get<Story>(`/api/stories/${id}`)
            .pipe(tap((story)=>this.story$$.next(story)));
    }

    ngOnDestroy(): void {
        this.storySubscription.unsubscribe();
    }
}