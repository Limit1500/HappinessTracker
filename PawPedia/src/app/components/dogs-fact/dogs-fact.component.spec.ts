import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogsFactComponent } from './dogs-fact.component';

describe('DogsFactComponent', () => {
  let component: DogsFactComponent;
  let fixture: ComponentFixture<DogsFactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DogsFactComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DogsFactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
