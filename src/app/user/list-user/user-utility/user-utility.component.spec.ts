import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUtilityComponent } from './user-utility.component';

describe('UserUtilityComponent', () => {
  let component: UserUtilityComponent;
  let fixture: ComponentFixture<UserUtilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserUtilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserUtilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
