import { Component } from '@angular/core';

import { Http } from "@angular/http";
import 'rxjs/add/operator/map';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  sbUser:string;
  sbPass:string;

  constructor(public http: Http) { }



  /**
   * METODO PARA VALIDAR LA EXISTENCIA DE UN DOCUMENTO CON DETERMINADO ID
   */
  validar(){

    //Linea de codigo para hacer la peticion al servidor y donde
    //sbUser es el id del documento a buscar
    let apache = this.http.get(`http://131.196.212.56:5984/user/${this.sbUser}`);

    //Linea de codigo en el cual captura la respuesta del servidor la encapsula
    //en 2 partes (cuando es aprobada [data] o cuando genera un error [error])
    apache.map(res => res.json()).subscribe(data => {
      if(data.pass == this.sbPass){
        console.log(`inicio de sesion`);
      } else {
        console.log(`contraseña incorrecta`);
      }
    }, error => {
      console.log(error);
    });
  }


  /**
   * METODO PARA REGISTRAR UN NUEVO DOCUMENTO CON DETERMINADO ID
   */
  Registrar(){

    //Linea de codigo para hacer la peticion al servidor y donde se envia en
    //formato json los parametros a ingresar
    let apache = this.http.post(`http://131.196.212.56:5984/user`, {
      "_id" : this.sbUser,
      "pass" : this.sbPass
    })

    //Linea de codigo en el cual captura la respuesta del servidor la encapsula
    //en 2 partes (cuando es aprobada [data] o cuando genera un error [error])
    apache.map(res => res.json()).subscribe(data => {
      console.log(data)

    }, error => {
      console.log(error);
    });
  }

  /**
   * METODO PARA ACTUALIZAR UN DOCUMENTO
   * PARA ESTO SE REQUIERE EL ID Y EL REV DESDE LA BASE DE DATOS
   */
  actualizar(){


    //Linea de codigo para hacer la peticion al servidor en donde se envia el id
    //como indicativo del documento. Esto se hace para el rev de la base de datos
    //esto es requerido para el proceso de update de documento.
    let url = this.http.get(`http://131.196.212.56:5984/user/${this.sbUser}`);

    //Linea de codigo en el cual captura la respuesta del servidor la encapsula
    //en 2 partes (cuando es aprobada [data] o cuando genera un error [error])
    url.map(res => res.json()).subscribe(data => {

      /**
       * Linea de codigo para hacer la peticion al servidor y donde se envia en
       * formato json los parametros a actualizar en cojunto con el rev
       * el cual actua como identificador de version
       */
      let rev:any = data._rev;
      let apache = this.http.put(`http://131.196.212.56:5984/user/${this.sbUser}`, {
        "_rev" : rev,
        "pass" : this.sbPass
      });
      /**
       * Linea de codigo en el cual captura la respuesta del servidor la encapsula
       * en 2 partes (cuando es aprobada [data] o cuando genera un error [error])
       */
      apache.map(res => res.json()).subscribe(data => {
        console.log(data)
      }, errorEnvio => {
        console.log(errorEnvio);
      });


    }, errorCaptura => {
      console.log(errorCaptura);
    });
  }

  /**
   * METODO PARA ELIMINAR UN DOCUMENTO
   * PARA ESTO SE REQUIERE EL ID Y EL REV DESDE LA BASE DE DATOS
   */
  eliminar(){

    //Linea de codigo para hacer la peticion al servidor en donde se envia el id
    //como indicativo del documento. Esto se hace para el rev de la base de datos
    //esto es requerido para el proceso de update de documento.
    let url = this.http.get(`http://131.196.212.56:5984/user/${this.sbUser}`);

    //Linea de codigo en el cual captura la respuesta del servidor la encapsula
    //en 2 partes (cuando es aprobada [data] o cuando genera un error [error])
    url.map(res => res.json()).subscribe(data => {

      /**
       * Linea de codigo para hacer la peticion al servidor y donde se envia en
       * rev el cual actua como identificador de version junto
       */
      let rev:any = data._rev;
      let apache = this.http.delete(`http://131.196.212.56:5984/user/${this.sbUser}?rev=${rev}`);

      /**
       * Linea de codigo en el cual captura la respuesta del servidor la encapsula
       * en 2 partes (cuando es aprobada [data] o cuando genera un error [error])
       */
      apache.map(res => res.json()).subscribe(data => {
        console.log(data)
      }, errorEliminar => {
        console.log(errorEliminar);
      });

    }, errorCaptura => {
      console.log(errorCaptura);
    });
  }




  ///----------------------------------------------------------------------------
  /**
   * OBTIENE TODAS LAS "TABLAS" DE LA BASE DE DATOS
   * LA ESTRUCTURA PARA QUE FUNCIONE EL HTTP.GET() ES
   * url/_all_dbs
   */
  alldb (){
    let apache = this.http.get('http://131.196.212.56:5984/_all_dbs');
    apache.map(res => res.json()).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }

  consulta(){
    let apache = this.http.get('http://131.196.212.56:5984/user/juan');
    apache.map(res => res.json()).subscribe(data => {
      console.log(data.name);
    }, error => {
      console.log(error);
    });
  }
}

