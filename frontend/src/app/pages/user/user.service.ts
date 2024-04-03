import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Subscription, tap } from "rxjs";
import { UserForAuth } from "src/app/types/user";
import { HttpClient } from "@angular/common/http";

@Injectable({providedIn:'root'})
export class UserService implements OnDestroy{
    private user$$ = new BehaviorSubject<UserForAuth | undefined>(undefined);
    private user$ = this.user$$.asObservable();

    user: UserForAuth|undefined;
    USER_KEY = '[user]';

    userSubscription: Subscription;

    get isLogged(): boolean{
        return !!this.user;
    }

    constructor(private http: HttpClient){
        this.userSubscription = this.user$.subscribe((user)=>{
            this.user = user;
        })
    }

    register(username:string, email: string, password: string, rePass: string){
        return this.http.post<UserForAuth>(
            '/api/users', {
                name:username,
                email,
                password
            })
            .pipe(tap((user)=>this.user$$.next(user)));
    }

    login(usernameOrEmail: string, password: string){
        return this.http
            .post<UserForAuth>('/api/users/login', {name: usernameOrEmail, password})
            .pipe(tap((user)=>this.user$$.next(user)
            ));
    }

    getProfile(){
        return this.http
            .get<UserForAuth>('/api/users/me')
            .pipe(tap((user)=>this.user$$.next(user)));
    }

    getUser(id:string){
        return this.http
            .get<UserForAuth>(`/api/users/${id}`)
            .pipe(tap((user)=>this.user$$.next(user)));
    }

    ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
    }
  }