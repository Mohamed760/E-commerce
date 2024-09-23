import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(productList:Product[], userWord:string):Product[]  {
    return productList.filter( (item)=> item.title.toLowerCase().includes(userWord.toLocaleLowerCase()) );
  }

}
