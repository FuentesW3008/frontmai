import { Component, OnInit } from '@angular/core';
import { Path } from '../../config';

import { CategoriesService } from 'src/app/services/categories.service';
import { SubCategoriesService } from 'src/app/services/sub-categories.service';

declare var jQuery:any;
declare var $: any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {


  path: string = Path.url;
  categories: any = [];
  render:Boolean = true;
  categoriesList: Array<any> = [];

  constructor(private categoriesService: CategoriesService,  private subCategoriesService: SubCategoriesService){}
  ngOnInit(): void {
    /*=============================================
		Tomamos la data de las categorías
		=============================================*/

		this.categoriesService.getData()
		.subscribe((resp:any) => {

			this.categories = resp;

			let i;

			for(i in resp){

				/*=============================================
				Separamos los nombres de categorías
				=============================================*/

				this.categoriesList.push(resp[i].name)

			}

		});
  }

  /*=============================================
	Función que nos avisa cuando finaliza el renderizado de Angular
	=============================================*/

	callback(){

		if(this.render){

			this.render = false;
			let arraySubCategories:any = [];

			/*=============================================
			Separar las categorías
			=============================================*/

			this.categoriesList.forEach(category=>{

				/*=============================================
				Colección de las sub-categorías filtrando con
        los nombres de categoría
				=============================================*/

				this.subCategoriesService.getFilterData("category", category)
				.subscribe((resp: any)=>{

					/*=============================================
					Recorrido por la colección general de subcategorias
          y clasifica las subcategorias y url
					de acuerdo a la categoría que correspondan
					=============================================*/

					let i;

					for(i in resp){

						arraySubCategories.push({

							"category": resp[i].category,
							"subcategory": resp[i].name,
							"url": resp[i].url

						})

					}

					/*=============================================
					Recorre el array de objetos nuevo para buscar
          coincidencias con los nombres de categorías
					=============================================*/

					for(i in arraySubCategories){

						if(category == arraySubCategories[i].category){


							$(`[category-footer='${category}']`).after(

								`<a href="products/${arraySubCategories[i].url}">${arraySubCategories[i].subcategory}</a>`

		          )

						}

					}

				})

			})

		}

	}
}
