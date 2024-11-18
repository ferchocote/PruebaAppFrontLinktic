import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { ResolveRequestResultService } from '../../../utils/resolve-requestResult';
import { RequestResult } from '../../../models/service/requestResult';
import { Login, Session } from '../models/login.model';

const apiUrl = 'https://localhost:7145/Api';

@Injectable()
export class LoginService {
  private currentUserSubject: BehaviorSubject<Session | null>;
  public currentUser: Observable<Session | null>;

  constructor(
    private http: HttpClient,
    private readonly _resolveReqSvc: ResolveRequestResultService,
    @Inject(PLATFORM_ID) private platformId: object // Inyección del ID del entorno
  ) {
    const user = this.isBrowser()
      ? JSON.parse(localStorage.getItem('currentUser') ?? 'null')
      : null;
    this.currentUserSubject = new BehaviorSubject<Session | null>(user);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  public get currentUserValue(): Session | null {
    return this.currentUserSubject.value;
  }

  getLogin(login: Login): Observable<RequestResult<Session | null>> {
    return this.http
      .post<RequestResult<Session | null>>(`${apiUrl}/Authentication/login`, login)
      .pipe(
        map((requestResult) => {
          if (this.isBrowser()) {
            localStorage.setItem('currentUser', JSON.stringify(requestResult.result));
          }
          this.currentUserSubject.next(requestResult.result);
          return requestResult;
        }),
        catchError(this._resolveReqSvc.handleError)
      );
  }
}
