import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedContainerComponent } from './breed-container.component';

describe('BreedContainerComponent', () => {
  let component: BreedContainerComponent;
  let fixture: ComponentFixture<BreedContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreedContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreedContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
