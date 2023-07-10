import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { SubCategoriesService } from 'src/app/services/sub-categories.service';
import { Path } from "../../config";

declare var jQuery:any;
declare var $: any;


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  path: string = Path.url;
  categories: any = [];
  arrayTittleList:Array<any> = [];
  render:boolean = true;

  constructor (private categoriesService: CategoriesService, private subCategoriesService: SubCategoriesService) {

  }

  ngOnInit(): void {

    /*================================================================
    Tomar la data de las Categorías
    ================================================================*/

    this.categoriesService.getData().subscribe((resp: any) => {
      this.categories =resp;

        /*================================================================
        Tomar la data de las Categorías
        ================================================================*/

        let i;

        for(i in resp){
          /*===========================================
          SEPARO LISTA DE TITULOS EN INDICES DE UN ARRAY
          ============================================*/

          this.arrayTittleList.push(JSON.parse(resp[i].title_list));


        }

    });

  }
  /*================================================================
  Función cuando finaliza el renderizado de angular
  ================================================================*/
  callback(){
    if(this.render){
      this.render = false;
      let arraySubCategories:any = [];
    /*===========================================
    RECORRIDO LISTA DE TITULOS
    ============================================*/
    this.arrayTittleList.forEach(titleList => {
      /*===========================================
      SEPARAR INDIVIDUALMENTE LOS TITULOS
      ============================================*/
       for (let i = 0; i < titleList.length; i++){
          /*================================================================
          SE TOMA LA COLECCIÓN DE SUB-CATEGORíAS FILTRANDO CON LA LISTA DE TíTULOS
          ================================================================*/
          this.subCategoriesService.getFilterData('title_list', titleList[i])
          .subscribe( (resp: any) => {
            arraySubCategories.push(resp);

              /*================================================================
              RECORRIDO POR LA COLECCION GENERAL DE SUBCATEGORIAS
              ================================================================*/

              let f;
              let g;
              let arrayTitleName = [];

              for (f in arraySubCategories){
                /*================================================================
                RECORRIDO POR LA COLECCION PARTICULAR DE CADA SUBCATEGORIA
                ================================================================*/
                for (g in arraySubCategories[f]){
                  /*================================================================
                  NUEVO ARRAY DE OBJETO CLASIFICANDO CADA SUBCATEGORIA CON LA RESPECTIVA LISTA DE TITULO
                  ================================================================*/
                  arrayTitleName.push(
                    {
                      'titleList': arraySubCategories[f][g].title_list,
                      'subcategory': arraySubCategories[f][g].name,
                      'url': arraySubCategories[f][g].url
                    })
                }
              }
                /*================================================================
                RECORRIDO DEL NUEVO ARRAY DE OBJETOS NUEVOS PARA BUSCAR COINCIDENCIAS CON LAS LISTAS DE TITULO
                ================================================================*/
              for (f in arrayTitleName) {
                if(titleList[i] == arrayTitleName[f].titleList) {

                  /*================================================================
                  IMPRIME EL NOMBRE DE SUBCATEGORIA DEBAJO DEL LISTADO CORRESPONDIENTE
                  ================================================================*/
                  $(`[titleList='${titleList[i]}']`).append(
                    `<li>
                      <a href="products/${arrayTitleName[f].url}">${arrayTitleName[f].subcategory}</a>
                    </li>`
                  )

                }
              }

          })

       }
    })
    }


  }
}
