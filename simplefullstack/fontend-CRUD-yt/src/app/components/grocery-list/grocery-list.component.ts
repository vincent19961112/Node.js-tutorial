import { Grocery } from './../../models/Grocery';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { GroceryListCrudService } from 'src/app/services/grocery-list-crud.service';
import { tap } from 'rxjs/operators';
@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.scss']
})
export class GroceryListComponent implements OnInit {


  groceries$: Observable<Grocery[]>;

  constructor(private groceryListCrudService: GroceryListCrudService) { }

  ngOnInit(): void {
  this.groceries$ = this.fetchAll();
  }

  fetchAll():Observable<Grocery[]>{
    return this.groceryListCrudService.fetchAll();
  }

  post(groceryItem: Partial<Grocery>): void{
    const item = ( groceryItem as string).trim();
    if (!item) { return; }

    this.groceries$ = this.groceryListCrudService.post({ item }).pipe(
      tap((_) => this.groceries$ = this.fetchAll() )
    );
  }

  update(id: number, newItem: Partial<Grocery>): void{
    const item = ( newItem as string).trim();
    if (!item) { return; }

    const newGrocery: Grocery = {
      id,
      item
    };

    this.groceries$ = this.groceryListCrudService.update(newGrocery).pipe(
    tap((_) => this.groceries$ = this.fetchAll() )
  );
  }

  Delete(id: number){
    this.groceries$ = this.groceryListCrudService.delete(id).pipe(
    tap((_) => this.groceries$ = this.fetchAll() )
  );
  }

}
