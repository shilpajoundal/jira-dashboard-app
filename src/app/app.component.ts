import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskBoardComponent } from './components/task-board/task-board.component'; // ✅ Import

@Component({
  selector: 'app-root',
  standalone: true,
 imports: [TaskBoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'jira-dashboard';
}
