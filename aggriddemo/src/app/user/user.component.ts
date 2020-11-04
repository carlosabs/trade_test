import { Component, OnInit } from '@angular/core';
import { Trade } from '../model/trade';
import { ColDef, GridApi, ColumnApi } from 'ag-grid-community';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DropDownEditor } from './drop.down.editor';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {


  // row data and column definitions
  public users: Trade[];
  public columnDefs: ColDef[];

  // gridApi and columnApi
  private api: GridApi;
  private columnApi: ColumnApi;

  constructor(private userService: UserService, private router: Router,private toastr: ToastrService) {
    this.columnDefs = this.createColumnDefs();
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(
      data => {
        this.users = data
      }
    )
  }

  // one grid initialisation, grap the APIs and auto resize the columns to fit the available space
  onGridReady(params): void {
    this.api = params.api;
    this.columnApi = params.columnApi;
    this.api.sizeColumnsToFit();
  }

  // create column definitions
  private createColumnDefs() {

    return [
      { headerName: 'Counterparty', 
        field: 'Counterparty.Description', 
        filter: true, 
        enableSorting: true, 
        editable: true, 
        sortable: true,
        cellEditorParams: {
            options: [{
                    name: "Company A",
                    value: 1
                },
                {
                    name: "Company B",
                    value: 2
                }
            ]
        },
        cellEditorFramework: DropDownEditor
      },
      { headerName: 'Direction', field: 'Direction', filter: true, editable: true, sortable: true },
      { headerName: 'Product', field: 'Product', filter: true, sortable: true, editable: true, cellRenderer: '<a href="edit-user">{{email}}</a>' },
      { headerName: 'Quantity', field: 'Quantity', filter: true, editable: true, sortable: true },
      { headerName: 'Price', field: 'Price', filter: true, editable: true },
      { headerName: 'Date', field: 'Date', filter: true, editable: true}
    ]
  }

  status: any;

  //Update user
  editUser() {
debugger;
   const d=this.api.getEditingCells();

    if (this.api.getSelectedRows().length == 0) {
      this.toastr.error("error", "Please select a User for update");
      return;
    }
    var row = this.api.getSelectedRows() as Trade[];

    if(row.length <= 0)
      return; 

    if(this.userService.idCounterparty >0)
      row[0].IdCounterparty = this.userService.idCounterparty;

    this.userService.updateUser(row[0]).subscribe(data => {
      this.toastr.success("success",data);
      this.ngOnInit();
      });
  }

  //Delete user
  deleteUser() {
    debugger;
    var selectedRows = this.api.getSelectedRows();

    if (selectedRows.length == 0) {
      this.toastr.error("error", "Please select a User for deletion");
      return;
    }
    this.userService.deleteUser(selectedRows[0].UserId).subscribe(data =>{
      this.toastr.success("success",data);
      this.ngOnInit();
      this.api.refreshRows(null);
    });
  }

  Add()
  {
    this.router.navigate(['addUser']);
  }

}

