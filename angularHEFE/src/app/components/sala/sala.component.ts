import { Component, OnInit, Input } from '@angular/core';
import { RoomsService } from '../../services/rooms.service';
import { Room } from '../../models/room';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sala',
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.css']
})
export class SalaComponent implements OnInit {

  @Input() room: Room;
  private uidCreator: string;
  public numberMembers: number;
  public user: any;
  public userData: any;
  constructor(
    public roomServices: RoomsService,
    public _router: Router,
    public userService: UserService
  ) {}

  async ngOnInit(){
    this.user = await this.userService.getCurrentUser();
    this.userService.getUserData(this.user.uid).subscribe(data =>{
      this.userData = data;

      if(this.userData.cuenta=='Docente'){
        this.uidCreator = this.user.uid;
        this.getCollectionRoom();
      }else{
        this.roomServices.getCreatorRoom(this.room.id).then((creator) => {
          //console.log(creator.data());
          this.uidCreator = creator.data().uidCreador;
          this.getCollectionRoom();
        });
      }
    }); 
  }

  private getCollectionRoom() {
    this.roomServices.getCollectionRoomAsync(this.uidCreator, this.room.id).subscribe(collection => {
      this.numberMembers = collection.length;
    });
  }

  detailsRoom(): void{  
    this._router.navigate(['detailsRoom',this.uidCreator, this.room.id]);
  }

}
