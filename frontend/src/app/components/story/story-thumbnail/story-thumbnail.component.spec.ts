import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryThumbnailComponent } from './story-thumbnail.component';

describe('StoryThumbnailComponent', () => {
  let component: StoryThumbnailComponent;
  let fixture: ComponentFixture<StoryThumbnailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoryThumbnailComponent]
    });
    fixture = TestBed.createComponent(StoryThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
