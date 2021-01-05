import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotesListaComponent } from './lotes-lista.component';

describe('LotesListaComponent', () => {
  let component: LotesListaComponent;
  let fixture: ComponentFixture<LotesListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LotesListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LotesListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
