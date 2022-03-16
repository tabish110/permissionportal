import { Injectable } from '@angular/core';
import { ActivatedRoute, CanActivate, Router } from '@angular/router';
import { DataService } from './shared/data.service';


@Injectable()
export class AuthGuard implements CanActivate {


  constructor(private routes: Router , private dataService: DataService) { }
  canActivate(): boolean {

    const token = localStorage.getItem('permission')
    const saveId = localStorage.getItem('id')
    const paths = this.dataService.registerUser.find(item => item?.id === saveId)
    if (!token && paths?.route !== ActivatedRoute) {
      this.routes.navigate(['/']);
      return false;
    }

    else {
      return true;
    }

  }

}
