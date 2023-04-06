import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable, map, of } from 'rxjs';
import { OpenstackIdentifier } from 'src/app/core/models/openstack-identifier';
import { OpenstackToken } from 'src/app/core/models/openstack-token';

@Injectable({
  providedIn: 'root',
})
export class OpenstackTokensService {
  private static readonly LOCALSTORAGE_PREFIX = 'openstack-token-';
  private static readonly OPENSTACK_TOKEN_ENDPOINT =
    'https://auth.cloud.ovh.net/v3/auth/tokens';

  constructor(private http: HttpClient) {}

  getOpenstackToken(identity: OpenstackIdentifier): Observable<OpenstackToken> {
    let result: any = localStorage.getItem(
      OpenstackTokensService.LOCALSTORAGE_PREFIX + identity.id
    );
    console.log(result);
    if (result !== 'undefined' && result !== undefined && result !== null) {
      let data: OpenstackToken = JSON.parse(result);
      let expireDate = new Date(data.expires);
      if (expireDate.getTime() < Date.now()) {
        /*let dataToReturn;
      await Axios.post(process.env.OVH_AUTH_ENDPOINT, requestBody, config)
      .then((response) => {
        const endpoints = response.data.token['catalog'].find((element) => element.type == 'object-store').endpoints;
        dataToReturn = {
          token: response.headers['x-subject-token'],
          url: endpoints.filter((element) => element.interface == 'public'),
          expires: response.data.token.expires_at
        };
      })
      .catch((err) => {
        console.error(err);
      });

      return dataToReturn;*/
        // result = this.httpService
        //   .post({
        //     method: 'generateOvhToken',
        //     params: {
        //       p: '',
        //       e: '',
        //       h: '',
        //     },
        //   })
        //   .pipe(
        //     tap((response) =>
        //       localStorage.setItem('ovhToken', JSON.stringify(response))
        //     ),
        //     catchError((err) => this.handleError(err))
        //   );
      } else {
        result = of(JSON.parse(result));
      }
    } else {
      // this.http
      //   .post(
      //     OpenstackTokensService.OPENSTACK_TOKEN_ENDPOINT,
      //     {
      //       auth: {
      //         identity: {
      //           methods: ['password'],
      //           password: {
      //             user: {
      //               name: identity.username,
      //               domain: { id: 'default' },
      //               password: identity.password,
      //             },
      //           },
      //         },
      //         scope: {
      //           project: {
      //             name: identity.project,
      //             domain: { id: 'default' },
      //           },
      //         },
      //       },
      //     },
      //     {
      //       headers: { 'Content-Type': 'application/json', Origin: 'http://localhost:4200' },
      //       observe: 'response',
      //     }
      //   )
      //   .pipe(
      //     map((response) => {
      //       console.log(response);
      //     })
      //   )
      //   .subscribe();
      let axiosInstance = axios.create();
      axiosInstance.post(
        OpenstackTokensService.OPENSTACK_TOKEN_ENDPOINT,
        {
          auth: {
            identity: {
              methods: ['password'],
              password: {
                user: {
                  name: identity.username,
                  domain: { id: 'default' },
                  password: identity.password,
                },
              },
            },
            scope: {
              project: {
                name: identity.project,
                domain: { id: 'default' },
              },
            },
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Origin: 'http://localhost:4200',
          },
        }
      ).then((response) => {
        console.log(response);
      });
    }

    return result;
  }
}
