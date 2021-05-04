import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrudCardPage } from './crud-card.page';

describe('CrudCardPage', () => {
  let component: CrudCardPage;
  let fixture: ComponentFixture<CrudCardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudCardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrudCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
