import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { AlertifyService } from 'src/app/_services/Alertify.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/User';
import { NgForm } from '@angular/forms';
import { MuskeetService } from 'src/app/_services/muskeet.service';


@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  user: User;
  photoUrl: string;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private alertify: AlertifyService, private route: ActivatedRoute,
    private muskeetService: MuskeetService) { }

    ngOnInit() {
      this.route.data.subscribe(data => {
  this.user = data['user'];
      });
      this.muskeetService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
    }

    update() {
      this.muskeetService.updateUser(this.muskeetService.decodedToken.nameid, this.user)
      .subscribe(next => {
        this.alertify.success('Profile updated');
        this.editForm.reset(this.user);
      }, error => {
        this.alertify.error(error);
      });
    }

}
