import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NodeLearningComponent } from './node-learning.component';

describe('NodeLearningComponent', () => {
  let component: NodeLearningComponent;
  let fixture: ComponentFixture<NodeLearningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NodeLearningComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NodeLearningComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
