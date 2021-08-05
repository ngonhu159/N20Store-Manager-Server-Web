import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { FormControl, FormGroup, Validators } from '@angular/forms';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {
  public cart : any = []
  public totalPrice = 0
  public totalNumberOf = 0
  public date : any = ""

  public information_customer = new FormGroup({
    payment: new FormControl('CK'),
    customer : new FormControl('', [Validators.required, Validators.minLength(1)]),
  })

  constructor(
    private common : CommonService 
  ) {
    this.cart = this.common.cartService
  }

  ngOnInit(): void {
    this.cart.forEach(element => {
      this.totalPrice = this.totalPrice + element["price"]
      this.totalNumberOf = this.totalNumberOf + element["numberOf"]
    })
    let today = new Date();
    this.date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear()
  }

  public async Payment_Receipt() {
    if (!this.information_customer.value.customer) {
      alert("Vui lòng nhập thông tin người nhận!")
    } else if (this.cart.length == 0) {
      alert("Hiện chưa có hàng hóa trong hóa đơn này.")
    } else {
      let result = await this.common.Export_Receipt(this.cart)
      if (result) {
        alert("Xuất hóa đơn thành công!")
        this.Cancel_Receipt()
      } else {
        alert("Xuất hóa đơn thất bại!")
      }
    }
  }

  public Cancel_Receipt() {
    this.cart = []
    this.common.cartService = this.cart
  }

  public Generate_PDF(cmd) {
    if (!this.information_customer.value.customer) {
      alert("Vui lòng nhập thông tin người nhận!")
    } else if (this.cart.length == 0) {
      alert("Hiện chưa có hàng hóa trong hóa đơn này.")
    } else {
      const documentDefinition = this.getDocumentDefinition();
      switch (cmd) {
        case 'OPEN': pdfMake.createPdf(documentDefinition).open(); break;
        case 'PRINT': pdfMake.createPdf(documentDefinition).print(); break;
        case 'DOWNLOAD': pdfMake.createPdf(documentDefinition).download(); break;
        default: pdfMake.createPdf(documentDefinition).open(); break;
      }
    }
  }
  
  getDocumentDefinition() {
    return {
      content: [
        {
          text: 'HÓA ĐƠN BÁN LẺ',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        ////////////////////////////////////////////////////////////////////////////////////
        {
          columns: [
            [
              {
                text: "N20 Store",
                style: 'header',
              }, {
                text: "Địa chỉ: 303, Tổ 13, Kiến Hưng 2, Kiến Thành, Chợ Mới, An Giang"
              }, {
                text: "Liên hệ: 0967484100",
              }, {
                text: "Email: waw.dvn.waw@gmail.com",
              }, {
                text: "Fanpage: facebook.com/N20Shop (N20 Store)",
                link: "https://www.facebook.com/N20Shop",
              }
            ],
          ]
        },
        ////////////////////////////////////////////////////////////////////////////////////
        {
          text: 'Chi tiết đơn hàng',
          style: 'header',
        },
        this.Get_List_Product(),
        ////////////////////////////////////////////////////////////////////////////////////
        {
          text: 'Hình thức thanh toán',
          style: 'header',
        },
        this.Get_Payment(),
        ////////////////////////////////////////////////////////////////////////////////////
        {
          text: 'Thông tin người nhận',
          style: 'header',
        },
        {
          text: this.information_customer.value.customer
        },
        ////////////////////////////////////////////////////////////////////////////////////
        this.Get_Date(),
        {
          text: 'Người lập hóa đơn',
          style: 'sign'
        },
        {
          columns : [
            { qr: "N20 Store - SĐT: 0967484100 - FB: https://www.facebook.com/N20Shop", fit: 100 },
            {
              text: "NV. Nguyễn Văn A",
              style: 'fullName'
            }
          ]
        }
      ],
      info: {
        title: "N20 Store" + '_Recipt',
        author: "Ngo Quoc Nhu",
        subject: 'Receipt',
        keywords: 'RECEIPT, ONLINE RECEIPT',
      },
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 20, 0, 10],
          },
          name: {
            fontSize: 16,
            bold: true
          },
          jobTitle: {
            fontSize: 14,
            bold: true,
            italics: true
          },
          foot: {
            margin: [0, 20, 0, 0],
            alignment: 'right',
            italics: true
          },
          sign: {
            margin: [0, 5, 18, 0],
            alignment: 'right',
            italics: true
          },
          fullName: {
            margin: [0, 90, 18, 0],
            alignment: 'right',
          },
          tableHeader: {
            bold: true,
            alignment: 'center'
          },
          tableBody: {
            // nothing
          },
          tableBodyCenter: {
            alignment: 'center'
          },
          tableBodyCenterTotal : {
            colspan: 4,
            alignment: 'center',
            bold: true
          }
        }
    };
  }

  public Get_List_Product() {
    const list = [];
    list.push([
      {
        text: 'STT',
        style: 'tableHeader'
      },
      {
        text: 'Tên sản phẩm',
        style: 'tableHeader'
      },
      {
        text: 'Số lượng',
        style: 'tableHeader'
      },
      {
        text: 'Đơn giá',
        style: 'tableHeader'
      },
      {
        text: 'Thành tiền',
        style: 'tableHeader'
      }
    ])
    let index = 0;
    this.cart.forEach(element => {
      index = index + 1
      list.push([
        {
          text: index,
          style: 'tableBodyCenter'
        },
        {
          text: element["name"],
          style: 'tableBody'
        },
        {
          text: element["numberOf"],
          style: 'tableBodyCenter'
        },
        {
          text: element["price"],
          style: 'tableBodyCenter'
        },
        {
          text: element["price"] * element["numberOf"],
          style: 'tableBodyCenter'
        }
      ])
    })
    list.push([
      {
        text: "",
        style: 'tableBodyCenterTotal'
      },
      {
        text: "",
        style: 'tableBodyCenterTotal'
      },
      {
        text: "",
        style: 'tableBodyCenterTotal'
      },
      {
        text: "Tổng",
        style: 'tableBodyCenterTotal'
      },
      {
        text: this.totalPrice,
        style: 'tableBodyCenter'
      },
    ])
    return {
      table: {
        widths: ['10%', '30%', '20%', '20%', '20%'],
        body : [
          ...list
        ]
      }
    }
  }

  public Get_Payment(){
    if (this.information_customer.value.payment == "TM") {
      return {
        text: "Tiền mặt"
      }
    } else if (this.information_customer.value.payment == "CK") {
      return {
        text: "Chuyển khoản"
      }
    } else if (this.information_customer.value.payment == "SC") {
      return {
        text: "Ship COD"
      }
    }
  }

  public Get_Date() {
    let today = new Date();
    return {
      text: "Ngày " + today.getDate() + " tháng " + (today.getMonth() + 1) + " năm " + today.getFullYear(),
      style: 'foot'
    }
  }
}
