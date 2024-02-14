import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ApproachComponent} from "./approach.component";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {Observable, of} from "rxjs";

describe('SmoothToolComponent', () => {
  let fixture: ComponentFixture<ApproachComponent>;
  let component: ApproachComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApproachComponent],
      imports: [TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader, useValue: {
            getTranslation(): Observable<Record<string, string>> {
              return of({});
            }
          }
        }
      })],
    }).compileComponents();

    fixture = TestBed.createComponent(ApproachComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
