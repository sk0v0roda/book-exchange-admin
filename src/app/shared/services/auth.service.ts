import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

export interface IUser {
  email: string;
  avatarUrl?: string;
}

const defaultPath = '/';
/*const defaultUser = {
  email: 'sandra@example.com',
  avatarUrl: 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/06.png'
};*/

@Injectable()
export class AuthService {
  private _user: IUser | null = null;
  private _baseUrl = environment.AuthService;

  get loggedIn(): boolean {
    return !!localStorage.getItem('email');
  }

  private _lastAuthenticatedPath: string = defaultPath;
  set lastAuthenticatedPath(value: string) {
    this._lastAuthenticatedPath = value;
  }

  constructor(private router: Router,
              private http: HttpClient) {
  }

  async logIn(email: string, password: string) {
    try {
      const response: any = await this.http.post(this._baseUrl + 'auth', {email: email, password: password}).toPromise();
      localStorage.setItem('accessToken', response.token);
      localStorage.setItem('email', email);
      this._user = {email: email};
      this.router.navigate([this._lastAuthenticatedPath]);
      return {
        isOk: true,
        data: this._user
      };
    } catch (err) {
      return {
        isOk: false,
        message: "Authentication failed"
      };
    }
  }

  async getUser() {
    try {
      const email = localStorage.getItem('email');
      return {
        isOk: true,
        data: {email: email}
      };
    } catch {
      return {
        isOk: false,
        data: null
      };
    }
  }
  async logOut() {
    this._user = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('email');
    this.router.navigate(['/login-form']);
  }

  async checkToken() {

  }
}

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.loggedIn;
    const isAuthForm = [
      'login-form',
    ].includes(route.routeConfig?.path || defaultPath);

    if (isLoggedIn && isAuthForm) {
      this.authService.lastAuthenticatedPath = defaultPath;
      this.router.navigate([defaultPath]);
      return false;
    }

    if (!isLoggedIn && !isAuthForm) {
      this.router.navigate(['/login-form']);
    }

    if (isLoggedIn) {
      this.authService.lastAuthenticatedPath = route.routeConfig?.path || defaultPath;
    }

    return isLoggedIn || isAuthForm;
  }
}
