import { StorageService } from "../services/storage-service/storage.service";

export function getData() {
    let storageService = new StorageService();
    storageService.getItem('post').subscribe(val => {
      if (val) {
          const post = JSON.parse(val);
          console.log('val------fff-->', post.cityName)
        return post.cityName;
      } 
    })    
}