import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryInputComponent } from './query-input.component';

describe('QueryInputComponent', () => {
  let component: QueryInputComponent;
  let fixture: ComponentFixture<QueryInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QueryInputComponent]
    });
    fixture = TestBed.createComponent(QueryInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
