import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedspageComponent } from './breedspage.component';

describe('BreedspageComponent', () => {
  let component: BreedspageComponent;
  let fixture: ComponentFixture<BreedspageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreedspageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreedspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
