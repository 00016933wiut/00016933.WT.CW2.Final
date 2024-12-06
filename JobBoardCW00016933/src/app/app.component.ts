/*This is work of a student of WIUT with ID of 00016933*/

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Listing } from '../models/listings.model';
import { AsyncPipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [AsyncPipe,HttpClientModule,FormsModule,ReactiveFormsModule, NgIf, CommonModule],
  standalone : true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'JobBoardCW00016933';
  http = inject(HttpClient);



  //Reading data
  listings$ = this.GetListings();
  private GetListings():Observable<Listing[]> {
    return this.http.get<Listing[]>('https://localhost:7072/api/Listings');
  }



  listingsForm = new FormGroup({
    companyName:new FormControl<string>(''),
    position:new FormControl<string>(''),
    salary:new FormControl<string>('')
  })


  //Adding method
  onFormSubmited(){
    const addListingRequest = {
      companyName:this.listingsForm.value.companyName,
      position:this.listingsForm.value.position,
      salary:this.listingsForm.value.salary,
    }

    this.http.post('https://localhost:7072/api/Listings', addListingRequest).subscribe({
      next: (value)=>{
        console.log(value);
        this.listings$ = this.GetListings();
        this.listingsForm.reset();
      }
    })
  };

  //Deleting method
  onDelete(id:string){
    console.log(id);
    this.http.delete(`https://localhost:7072/api/Listings/${id}`).subscribe({
      next:(value)=>{
        alert('Item deleted');
        this.listings$ = this.GetListings();
      }
    })
  };


  //Editing method part
  editingListing: any = null;

  onEdit(listing: any) {
    this.editingListing = { ...listing }; 
  }

  updateItem() {
    if (this.editingListing) {
      this.http
        .put(`https://localhost:7072/api/Listings/${this.editingListing.id}`, this.editingListing)
        .subscribe({
          next: () => {
            alert('Listing updated successfully.');
            this.listings$ = this.GetListings();
            this.editingListing = null;
          },
          error: (err) => {
            alert(`Failed to update a listing: ${err.message}`);
          },
        });
    }
  }

  cancelEdit() {
    this.editingListing = null;
  }

}

