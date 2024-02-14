import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SmoothToolApplicationComponent} from "./smooth-tool-application.component";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {Observable, of} from "rxjs";

describe('SmoothToolApplicationComponent', () => {
  let fixture: ComponentFixture<SmoothToolApplicationComponent>;
  let component: SmoothToolApplicationComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmoothToolApplicationComponent],
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

    fixture = TestBed.createComponent(SmoothToolApplicationComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
