/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GetListComponent } from './GetList.component';

describe('GetListComponent', () => {
  let component: GetListComponent;
  let fixture: ComponentFixture<GetListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
