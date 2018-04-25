import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

const CONTACT_URL = `./assets/contacts.json`;

@Injectable()
export class ContactService {
  constructor(
    private http:Http
  ) {}

  request(url:string, opts:any) {
    return this.http.request(url, new RequestOptions(opts))
    .map(res => {
      let _res = res.json();
      return _res;
    })
  }

  get(url:string, opts?:Object) {
    return this.request(url, (<any>Object).assign({
      method: 'get'
    }, opts));
  }

  getContactsData() {
    return this.get(CONTACT_URL);
  }

  addContact(obj:Object = {}) {
    let body = JSON.stringify(obj);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(CONTACT_URL, body, options).map(res => res.json());
  }

}
