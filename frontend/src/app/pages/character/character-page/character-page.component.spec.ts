import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterPageComponent } from './character-page.component';

describe('CharacterPageComponent', () => {
  let component: CharacterPageComponent;
  let fixture: ComponentFixture<CharacterPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterPageComponent]
    });
    fixture = TestBed.createComponent(CharacterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
