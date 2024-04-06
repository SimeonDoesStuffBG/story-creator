import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Character } from "src/app/types/character";

@Injectable({providedIn:'root'})
export class CharacterService{
    constructor(private http:HttpClient){
    }

    createCharacter(name:string, description:string){
        return this.http
            .post<Character>('/api/characters', {name, description});
    
    }
}