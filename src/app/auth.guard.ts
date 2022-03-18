import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { DataService } from './shared/data.service';


@Injectable()
export class AuthGuard implements CanActivate {


  constructor(private routes: Router, private dataService: DataService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const token = localStorage.getItem('permission')
    const saveId = localStorage.getItem('id')
    const currentpath = route.url[0].path
    const paths = this.dataService.registerUser.find(item => item?.id === saveId)
    const fin = paths?.route
    const test = fin.findIndex((item: any) => item.path == currentpath)

    if (!token) {
      this.routes.navigate(['/']);
      return false;
    }

    else {
      if (test < 0) {
        this.routes.navigate(['messagescreen']);
        return false
      }
      else {
        return true;
      }

    }

  }
}