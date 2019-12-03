/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CardWorkShopListComponent } from './cardWorkShop-list.component';

describe('CardWorkShopListComponent', () => {
  let component: CardWorkShopListComponent;
  let fixture: ComponentFixture<CardWorkShopListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardWorkShopListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardWorkShopListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
