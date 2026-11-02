import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {Frontpage} from "./pages/frontpage";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        Frontpage
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(Frontpage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'wexo-web'`, () => {
    const fixture = TestBed.createComponent(Frontpage);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('wexo-web');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(Frontpage);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('wexo-web app is running!');
  });
});
