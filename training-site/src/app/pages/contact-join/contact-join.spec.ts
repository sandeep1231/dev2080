import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactJoinComponent } from './contact-join.component';

describe('ContactJoinComponent', () => {
  let component: ContactJoinComponent;
  let fixture: ComponentFixture<ContactJoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactJoinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactJoinComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
