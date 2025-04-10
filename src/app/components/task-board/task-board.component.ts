import { Component, OnInit } from '@angular/core';
import { TaskListComponent } from '../task-list/task-list.component';
import { TaskCardComponent } from '../task-card/task-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [CommonModule, TaskListComponent, TaskCardComponent],
  templateUrl: './task-board.component.html',
  styleUrl: './task-board.component.css',
})
export class TaskBoardComponent implements OnInit {
  cards: any[] = [];
  lists: string[] = [];
  draggedCard: any = null;

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const storedCards = localStorage.getItem('cards');
      const storedLists = localStorage.getItem('lists');

      this.cards = storedCards ? JSON.parse(storedCards) : [];
      this.lists = storedLists
        ? JSON.parse(storedLists)
        : ['todo', 'inprogress', 'done'];
    } else {
      this.cards = [];
      this.lists = ['todo', 'inprogress', 'done'];
    }
  }

  getCardsByStatus(status: string) {
    return this.cards
      .filter((card) => card.status === status)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }

  addCardToList(status: string): void {
    const title = prompt('Enter task name');
    const description = prompt('Enter task description');
    if (title && description) {
      const newCard = {
        id: crypto.randomUUID(),
        title,
        description,
        status,
        createdAt: new Date(),
      };
      this.cards = [...this.cards, newCard];
      this.saveToStorage();
    }
  }

  onCardDragStart(card: any) {
    this.draggedCard = card;
  }

  onCardDrop(status: string) {
    if (this.draggedCard && this.draggedCard.status !== status) {
      this.draggedCard.status = status;
      this.cards = [...this.cards];
      this.saveToStorage();
    }
    this.draggedCard = null;
  }

  deleteCard(cardId: string): void {
    this.cards = this.cards.filter((card) => card.id !== cardId);
    this.saveToStorage();
  }
  addList(): void {
    const newStatus = prompt(
      'Enter list name (e.g. QA, Blocked, Review)'
    )?.toLowerCase();

    if (newStatus && !this.lists.includes(newStatus)) {
      this.lists.push(newStatus);
      this.saveToStorage();
    }
  }
  deleteList(status: string): void {
    this.lists = this.lists.filter((l) => l !== status);
    this.cards = this.cards.filter((card) => card.status !== status);

    this.saveToStorage();
  }

  saveToStorage(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cards', JSON.stringify(this.cards));
      localStorage.setItem('lists', JSON.stringify(this.lists));
    }
  }
}
