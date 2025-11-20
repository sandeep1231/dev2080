import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MongodbLearningComponent } from './mongodb-learning.component';

describe('MongodbLearningComponent', () => {
  let component: MongodbLearningComponent;
  let fixture: ComponentFixture<MongodbLearningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MongodbLearningComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MongodbLearningComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
