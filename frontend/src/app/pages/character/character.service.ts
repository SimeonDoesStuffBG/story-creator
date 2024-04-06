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

    viewCharacters(userId=""){
        let url:string;

        if(userId.length>0){
            url = `/api/users/${userId}/characters`
        }else{
            url = '/api/characters';
        }

        return this.http
            .get<Character[]>(url);
    }

    viewCharacter(charId:string){
        return this.http
            .get<Character>(`/api/characters/${charId}`);
    }

    editCharacter(charId:string, name:string, description:string){
        return this.http
            .put<Character>(`/api/characters/${charId}`,{name,description});
    }
}