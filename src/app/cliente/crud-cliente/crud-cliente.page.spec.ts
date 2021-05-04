import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrudClientePage } from './crud-cliente.page';

describe('CrudClientePage', () => {
  let component: CrudClientePage;
  let fixture: ComponentFixture<CrudClientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudClientePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrudClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
