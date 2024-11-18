import { ToastrService } from "ngx-toastr";

export function showWarningToast(title:string, subtitle:string, toastr:ToastrService) :void {
    toastr.warning(subtitle, title, {
      tapToDismiss:true,
      closeButton:true,
      progressBar:true,
      timeOut:5000,
      positionClass: 'toast-bottom-right',
      newestOnTop:true,
    });
  }
  
  export function showSuccessToast(title:string, subtitle:string, toastr:ToastrService) :void {
    toastr.success(subtitle, title, {
      tapToDismiss:true,
      closeButton:true,
      progressBar:true,
      timeOut:5000,
      positionClass: 'toast-bottom-right',
      newestOnTop:true,
    });
  }

  export function showInfoToast(title:string, subtitle:string, toastr:ToastrService) :void {
    toastr.info(subtitle, title, {
      tapToDismiss:true,
      closeButton:true,
      progressBar:true,
      timeOut:5000,
      positionClass: 'toast-bottom-right',
      newestOnTop:true,
    });
  }

  export function showErrorToast(title:string, subtitle:string, toastr:ToastrService) :void {
    toastr.error(subtitle, title, {
      tapToDismiss:true,
      closeButton:true,
      progressBar:true,
      timeOut:5000,
      positionClass: 'toast-bottom-right',
      newestOnTop:true,
    });
  }