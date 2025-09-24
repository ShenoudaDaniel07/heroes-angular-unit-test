import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessagesForLab } from './messages.lab';
import { MessageService } from '../../services/message/message.service';
import { provideZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('2-message component testing:', () => {
  let component: MessagesForLab;
  let fixture: ComponentFixture<MessagesForLab>;
  let service: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MessagesForLab],
      providers: [MessageService, provideZonelessChangeDetection()],
    });

    fixture = TestBed.createComponent(MessagesForLab);
    component = fixture.componentInstance;
    service = TestBed.inject(MessageService);
  });

  it('expect component template to be empty', () => {
    fixture.detectChanges();
    let container = fixture.nativeElement.querySelector('#container');
    expect(container).toBeNull();
  });

  it('then expect div.msg to have the messages after setting it', () => {
    service.add('hello world');
    service.add('angular test');

    fixture.detectChanges();

    let msgs = fixture.debugElement.queryAll(By.css('.msg'));
    expect(msgs.length).toBe(2);
    expect(msgs[0].nativeElement.textContent).toContain('hello world');
    expect(msgs[1].nativeElement.textContent).toContain('angular test');
  });
});
