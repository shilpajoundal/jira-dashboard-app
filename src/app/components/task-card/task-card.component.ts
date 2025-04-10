import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
})
export class TaskCardComponent {
  @Input() card: any;
  @Output() delete = new EventEmitter<string>();
  @Output() dragStart = new EventEmitter<any>();

  onDelete(): void {
    this.delete.emit(this.card.id);
  }

  onDragStart(): void {
    this.dragStart.emit(this.card);
  }
}
