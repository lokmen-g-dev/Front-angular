import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MasterService } from 'src/app/service/master.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  inputdata: any;
  editdata: any;
  closemessage = 'closed using directive'
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<PopupComponent>, private buildr: FormBuilder,
    private service: MasterService) {

  }
  ngOnInit(): void {
    this.inputdata = this.data;
    if(this.inputdata.code>0){
      this.setpopupdata(this.inputdata.code)
    }
  }
  fileToUpload: any 
  upload(event:any){
    this.fileToUpload= event.target.files[0]
  }
  
  setpopupdata(code: any) {
    this.service.GetCustomerbycode(code).subscribe(item => {
      this.editdata = item;
      this.myform.setValue({titre:this.editdata.titre,Description:this.editdata.Description,fileData:this.editdata.fileToUpload,
        type:this.editdata.type})
    });
  }

  closepopup() {
    this.ref.close('Closed using function');
  }

  myform = this.buildr.group({
    titre: this.buildr.control(''),
    Description: this.buildr.control(''),
    fileData: this.buildr.control(''),
    type: this.buildr.control(true)
  });

  Saveuser() {
    this.service.Savecustomer(this.myform.value).subscribe(res => {
      this.closepopup();
    });
  }
}
