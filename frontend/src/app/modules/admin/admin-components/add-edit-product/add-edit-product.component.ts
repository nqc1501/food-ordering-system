import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdminService} from "../../admin-services/admin.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent {

  validateForm: FormGroup;
  imageUrl: string;
  imageData: string;

  constructor(
    private service: AdminService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEditProductComponent>,
    private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any | null = null
  ) {
    this.validateForm = this.fb.group({
        name: ['', Validators.required],
        productCode: ['', Validators.required],
        image: ['', Validators.required],
        type: ['', Validators.required],
        price: ['', Validators.required],
        quantity: ['', Validators.required],
        description: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.validateForm.patchValue(this.data);
    if (this.data) {
      this.imageData = this.data.image;
      this.imageUrl = 'data:image/jpeg;base64,' + this.data.image;
    } else {
      this.imageUrl = null;
    }
  }

  onFormSubmit() {
    if (this.validateForm.valid) {
      const fd = new FormData();
      fd.append('name', this.validateForm.value.name);
      fd.append('productCode', this.validateForm.value.productCode);
      fd.append('image', this.imageData);
      fd.append('type', this.validateForm.value.type);
      fd.append('price', this.validateForm.value.price);
      fd.append('quantity', this.validateForm.value.quantity);
      fd.append('description', this.validateForm.value.description);

      if (this.data) {
        this.service.editProduct(fd).subscribe({
            next: (val) => {
              this.snackbar.open("Sửa thông tin mặt hàng thành công.", "OK", { duration: 5000 });
              this.dialogRef.close(true);
            },
            error: (err) => {
              console.log(err);
            }
        });
      } else {
        this.service.addProduct(fd).subscribe({
            next: (val) => {
              this.snackbar.open("Thêm mặt hàng thành công.", "OK", { duration: 5000 });
              this.dialogRef.close(true);
            },
            error: (err) => {
              this.snackbar.open("Mặt hàng đã tồn tại hoặc hình ảnh thêm vào có dung lượng quá lớn.", "Close", { duration: 5000 });
            }
        });
      }
    }
  }

  handleFileInput(event: any) {
    const files = event.target.files;
    if (files && files[0]) {
      const selectedFile = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target?.result as string;
        this.imageData = base64String.split(',')[1];
        this.imageUrl = base64String;
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  openFileExplorer() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  }
}
