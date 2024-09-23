import { ChangeDetectionStrategy, Component, OnInit, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
  changeDetection  : ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent implements OnInit {

  ngOnInit(): void {
    if (typeof localStorage != "undefined") {
      localStorage.setItem("currentPage", "/categories")
    }
  }




}
