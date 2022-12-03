import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

export const handleErrorMessage = (error: HttpErrorResponse) =>{
    let errorMessage: string = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage  = `Error : ${error.error.message}`;
    } else {
      errorMessage  = `Status : ${error.status} \n Message : ${error.message}`;
    }
    return throwError(errorMessage);
  }