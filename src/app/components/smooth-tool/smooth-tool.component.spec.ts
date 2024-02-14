import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SmoothToolComponent} from "./smooth-tool.component";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {Observable, of} from "rxjs";

describe('SmoothToolComponent', () => {
  let fixture: ComponentFixture<SmoothToolComponent>;
  let component: SmoothToolComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmoothToolComponent],
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

    fixture = TestBed.createComponent(SmoothToolComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
