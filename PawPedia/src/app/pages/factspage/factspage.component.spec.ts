import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactspageComponent } from './factspage.component';

describe('FactspageComponent', () => {
  let component: FactspageComponent;
  let fixture: ComponentFixture<FactspageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FactspageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
