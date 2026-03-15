import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-widget',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-widget.component.html',
  styleUrl: './chat-widget.component.scss',
})
export class ChatWidgetComponent implements AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  userInput = '';
  apiKeyInput = '';
  showApiKeyInput = false;
  isInputFocused = false;
  private shouldScroll = false;

  constructor(public chat: ChatService) {}

  ngAfterViewChecked() {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  send() {
    if (!this.userInput.trim()) return;
    this.chat.sendMessage(this.userInput);
    this.userInput = '';
    this.shouldScroll = true;
  }

  sendQuickReply(value: string) {
    this.chat.sendMessage(value);
    this.shouldScroll = true;
  }

  setApiKey() {
    if (!this.apiKeyInput.trim()) return;
    this.chat.configureApiKey(this.apiKeyInput.trim());
    this.apiKeyInput = '';
    this.showApiKeyInput = false;
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.send();
    }
  }

  private scrollToBottom() {
    try {
      const el = this.messagesContainer?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    } catch (_) {}
  }
}
