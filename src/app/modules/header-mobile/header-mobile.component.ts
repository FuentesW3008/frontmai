import { Component, OnInit } from '@angular/core';
import { Path } from '../../config';


import { CategoriesService } from 'src/app/services/categories.service';
import { SubCategoriesService } from 'src/app/services/sub-categories.service';

declare var jQuery:any;
declare var $: any;


@Component({
  selector: 'app-header-mobile',
  templateUrl: './header-mobile.component.html',
  styleUrls: ['./header-mobile.component.css']
})
export class HeaderMobileComponent implements OnInit {

  path: string = Path.url;
  categories: any = [];
  render:Boolean = true;
  categoriesList: Array<any> = [];

  constructor(private categoriesService: CategoriesService,  private subCategoriesService: SubCategoriesService){}

  ngOnInit(): void {

    /*================================================================
    Tomar la data de las Categorías
    ================================================================*/

    this.categoriesService.getData()
    .subscribe((resp: any) => {
      this.categories =resp;
    /*================================================================
    Recorrido objeto Data Categorías
    ================================================================*/
      let i;

      for(i in resp){
        /*================================================================
        Separa nombre de las Categorías
        ================================================================*/
        this.categoriesList.push(resp[i].name);

      }


    })
    /*================================================================
    Acticvamos el efecto TOGGLE en el listado de SubCategorías
    ================================================================*/

    $(document).on("click", ".sub-toggle", (event: { target: any; }) => {
      $(event.target).parent().children("ul").toggle();
    })
  }

	/*=============================================
	Función que avisa cuando finaliza el renderizado
   de Angular
	=============================================*/
  callback(){

    if(this.render){
      this.render = false;
      let arraySubCategories:any = [];

      /*=============================================
			Separar las categorías
			=============================================*/

      this.categoriesList.forEach(category => {

        /*=============================================
				Colección de las sub-categorías filtrando con
        los nombres de categoría
				=============================================*/

        this.subCategoriesService.getFilterData('category', category)
        .subscribe( (resp:any) => {

          /*=============================================
					Recorrido por la colección general de subcategorias
           y clasifica las subcategorias y url
					de acuerdo a la categoría que correspondan
					=============================================*/

          let i;

          for (i in resp){

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

							$(`[category='${category}']`).append(
								`<li class="current-menu-item ">
		                <a href="products/${arraySubCategories[i].url}">${arraySubCategories[i].subcategory}</a>
		            </li>`
		          )

						}

					}

        });

      })
    }

  }

}
