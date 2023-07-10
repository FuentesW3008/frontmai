import { Component, OnInit } from '@angular/core';
import { Path, } from '../../config';
import { ProductService } from '../../services/products.service';

@Component({
  selector: 'app-header-promotion',
  templateUrl: './header-promotion.component.html',
  styleUrls: ['./header-promotion.component.css']
})
export class HeaderPromotionComponent implements OnInit {

  path: string = Path.url;
  top_banner:any = [];
  category: any = [];
  preload:boolean = false;


  constructor (private productService:ProductService){}

  ngOnInit(): void {
    this.preload = true;
    this.productService.getData()
      .subscribe((resp: any) => {
        const keys = Object.keys(resp); // Obtener las claves del objeto
        const ind = keys[7]; // Acceder al indice deseado del objetto
       //console.log('Valor de la quinta clave:', res[ind]);
        /*================================================================
        Tomar la longitud del Objeto
        ================================================================*/
        let i;
        let size = 0;
        for(i in resp) {
          size++;
        }
        /*================================================================
        Generar un número aleatorio
        ================================================================*/
        let index = Math.floor(Math.random()*size);
        /*================================================================
        Devolver BANNER aleatorio
        ================================================================*/

        this.top_banner = JSON.parse(resp[keys[index]].top_banner);
        this.category = resp[keys[index]].category;
        console.log('ruta',this.category);
        this.preload = false;

      });
  }
}


