import { Component, Input, Output, EventEmitter } from '@angular/core';
import { List } from '../../models/list.model';
import { TaskCardComponent } from '../task-card/task-card.component';
import { Card } from '../../models/card.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskCardComponent, CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  @Input() status!: string;
  @Input() cards: any[] = [];

  @Output() addCard = new EventEmitter<string>();
  @Output() deleteCard = new EventEmitter<string>();
  @Output() cardDragStart = new EventEmitter<any>();
  @Output() cardDrop = new EventEmitter<void>();
  @Output() deleteList = new EventEmitter<void>();

  getTitle(): string {
    const mapping: any = {
      todo: 'To Do',
      inprogress: 'In Progress',
      done: 'Done'
    };
    return mapping[this.status] || this.status.charAt(0).toUpperCase() + this.status.slice(1);
  }
  onDeleteList(): void {
    if (confirm(`Are you sure you want to delete the "${this.getTitle()}" list and all its cards?`)) {
      this.deleteList.emit();
    }
  }

  onAddCard(): void {
    this.addCard.emit(this.status);
  }

  onDeleteCard(cardId: string): void {
    this.deleteCard.emit(cardId);
  }

  handleDragStart(card: any) {
    this.cardDragStart.emit(card);
  }

  handleDrop(event: DragEvent): void {
    event.preventDefault();
    this.cardDrop.emit();
  }

  allowDrop(event: DragEvent): void {
    event.preventDefault();
  }
}
